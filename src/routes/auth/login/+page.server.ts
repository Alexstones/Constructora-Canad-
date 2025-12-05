// src/routes/auth/login/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, error as kitError } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

const cookieOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: false, // 🔐 ponlo en true en producción con HTTPS
  maxAge: 60 * 60 * 24 * 7 // 7 días
};

export const load: PageServerLoad = async ({ locals, cookies }) => {
  // Revisamos cookies de sesión
  const cookieEmail = cookies.get('session_email');
  const cookieRole = cookies.get('session_role');

  if (cookieEmail) {
    if (cookieRole === 'admin') {
      throw redirect(303, '/admin');
    }
    // worker / client
    throw redirect(303, '/worker/dashboard');
  }

  // Por si mantienes locals.session
  if (locals.session?.user) {
    throw redirect(303, '/');
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
      return fail(400, {
        email,
        message: 'Email y contraseña son obligatorios'
      });
    }

    // LOGIN con Supabase Auth
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !data.user || !data.session) {
      console.error('Error login:', authError);
      return fail(400, {
        email,
        message: 'Correo o contraseña incorrectos.'
      });
    }

    const userId = data.user.id;
    const userEmail = data.user.email ?? email;

    console.log('LOGIN OK, user id:', userId);

    // Leer rol desde user_roles (is_admin)
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('is_admin')
      .eq('user_id', userId)
      .maybeSingle();

    if (roleError) {
      console.error('Error obteniendo rol de admin en login:', roleError);
      throw kitError(500, 'No se pudo verificar el rol del usuario');
    }

    const role = roleData?.is_admin ? 'admin' : 'worker';

    // Guardamos email y rol en cookies (para layout / rutas)
    cookies.set('session_email', userEmail, cookieOptions);
    cookies.set('session_role', role, cookieOptions);

    if (role === 'admin') {
      console.log('Es admin, enviando a /admin...');
      throw redirect(303, '/admin');
    }

    console.log('No es admin, enviando a /worker/dashboard...');
    throw redirect(303, '/worker/dashboard');
  }
};
