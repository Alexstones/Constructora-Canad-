// src/routes/auth/register/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const cookieEmail = cookies.get('session_email');
  const cookieRole = cookies.get('session_role');

  if (cookieEmail) {
    if (cookieRole === 'admin') {
      throw redirect(303, '/admin');
    }
    throw redirect(303, '/worker/dashboard');
  }

  if (locals.session?.user) {
    throw redirect(303, '/');
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const password = data.get('password')?.toString() || '';
    const role = (data.get('role')?.toString() || 'worker') as 'worker' | 'client';

    const errors: Record<string, string> = {};

    if (!name) errors.name = 'Ingresa tu nombre.';
    if (!email) errors.email = 'Ingresa un correo válido.';
    if (!password || password.length < 6)
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        values: { name, email, role }
      };
    }

    // 1) Crear usuario en Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError || !signUpData.user) {
      console.error('Error en signUp:', signUpError);
      return {
        success: false,
        errors: {
          email: 'No pudimos crear tu cuenta. Intenta con otro correo o más tarde.'
        },
        values: { name, email, role }
      };
    }

    const user = signUpData.user;

    // 2) Crear registro en profiles
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: name,
      role,
      created_at: new Date().toISOString()
    });

    if (profileError) {
      console.error('Error creando profile:', profileError);
      // no rompemos el registro, pero avisamos
    }

    // 3) Registrar rol básico (no admin)
    const { error: roleError } = await supabase.from('user_roles').insert({
      user_id: user.id,
      is_admin: false
    });

    if (roleError) {
      console.error('Error creando user_roles:', roleError);
    }

    return {
      success: true
    };
  }
};
