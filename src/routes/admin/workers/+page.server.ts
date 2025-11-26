// src/routes/admin/workers/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const load: PageServerLoad = async ({ cookies }) => {
  // 1) Comprobar sesión y rol usando las cookies que pones en el login
  const role = cookies.get('session_role');
  const email = cookies.get('session_email');

  // Solo admins pueden ver esta página
  if (role !== 'admin' || !email) {
    throw redirect(303, '/auth/login');
  }

  // 2) Cargar perfiles de trabajadores desde worker_profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('worker_profiles')
    .select(
      `
        id,
        user_id,
        full_name,
        city,
        phone,
        services,
        years_experience,
        worker_type,
        certs,
        bio,
        created_at,
        updated_at
      `
    )
    .order('created_at', { ascending: false });

  if (profilesError) {
    console.error('Error cargando worker_profiles:', profilesError);
    throw error(500, 'No se pudieron cargar los perfiles de trabajadores.');
  }

  return {
    userEmail: email,
    profiles: profiles ?? []
  };
};
