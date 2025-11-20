import type { Actions } from './$types';
import { supabase } from '$lib/server/supabaseClient';

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
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: name,
        role,
        created_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error creando profile:', profileError);
      // no rompemos el registro, pero avisamos
    }

    // En el flujo normal Supabase manda email de confirmación si lo configuras.
    return {
      success: true
    };
  }
};
