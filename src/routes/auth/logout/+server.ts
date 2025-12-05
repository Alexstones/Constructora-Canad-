// src/routes/auth/logout/+server.ts
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const POST: RequestHandler = async ({ request, cookies }) => {
  // Opcional: cerrar sesión en Supabase Auth (no es estrictamente necesario si usas sólo cookies)
  try {
    const accessToken = cookies.get('sb-access-token');
    if (accessToken) {
      await supabase.auth.signOut();
    }
  } catch (e) {
    console.error('Error cerrando sesión en Supabase:', e);
  }

  cookies.delete('session_email', { path: '/' });
  cookies.delete('session_role', { path: '/' });

  throw redirect(303, '/');
};
