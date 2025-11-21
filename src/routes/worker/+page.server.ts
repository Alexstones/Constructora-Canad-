// src/routes/worker/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  // locals.user viene del hooks.server.ts con Supabase
  if (locals.user) {
    // Si ya tiene sesión, lo mandamos directo al dashboard
    throw redirect(303, '/worker/dashboard');
  }

  // Si no hay usuario, mostramos la landing normal
  return {};
};
