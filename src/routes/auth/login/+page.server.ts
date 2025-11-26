// src/routes/auth/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

const cookieOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: false, // ponlo en true en producción con HTTPS
  maxAge: 60 * 60 * 24 * 7 // 7 días
};

export const load: PageServerLoad = async () => {
  // solo mostramos el formulario
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
      return fail(400, {
        message: 'Email y contraseña son obligatorios',
        email
      });
    }

    // LOGIN con el cliente de servidor
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !data.user) {
      console.error('Error login:', authError);
      return fail(400, {
        message: 'Credenciales incorrectas',
        email
      });
    }

    console.log('LOGIN OK, user id:', data.user.id);

    // Ver rol en user_roles
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('is_admin')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (roleError) {
      console.error('Error obteniendo rol de admin en login:', roleError);
      throw error(500, 'No se pudo verificar el rol del usuario');
    }

    const userEmail = data.user.email ?? email;

    // Guardamos email y rol en cookies
    cookies.set('session_email', userEmail, cookieOptions);
    cookies.set(
      'session_role',
      roleData?.is_admin ? 'admin' : 'worker',
      cookieOptions
    );

    if (roleData?.is_admin) {
      console.log('Es admin, enviando a /admin...');
      throw redirect(303, '/admin');
    }

    console.log('No es admin, enviando a /worker/dashboard...');
    throw redirect(303, '/worker/dashboard');
  }
};
