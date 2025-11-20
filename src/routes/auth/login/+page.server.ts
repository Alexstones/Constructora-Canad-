import type { Actions } from './$types';
import { supabase } from '$lib/server/supabaseClient';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const email = data.get('email')?.toString().trim() || '';
    const password = data.get('password')?.toString() || '';

    const errors: Record<string, string> = {};

    if (!email) errors.email = 'Ingresa tu correo.';
    if (!password) errors.password = 'Ingresa tu contraseña.';

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        values: { email }
      };
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError || !signInData.session) {
      console.error('Error en login:', signInError);
      return {
        success: false,
        errors: {
          email: 'Correo o contraseña incorrectos.'
        },
        values: { email }
      };
    }

    // De momento solo confirmamos login en consola
    console.log('LOGIN OK, user id:', signInData.user?.id);

    return {
      success: true
    };
  }
};
