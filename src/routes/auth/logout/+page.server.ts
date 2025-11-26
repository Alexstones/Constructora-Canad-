// src/routes/auth/logout/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const load: PageServerLoad = async () => {
  throw redirect(303, '/');
};

export const actions: Actions = {
  default: async ({ cookies }) => {
    // Si usas supabase auth en frontend puedes llamar a signOut allí,
    // aquí limpiamos solo nuestras cookies custom:
    cookies.delete('session_email', { path: '/' });
    cookies.delete('session_role', { path: '/' });

    throw redirect(303, '/');
  }
};
