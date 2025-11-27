// src/routes/admin/workers/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
  const supabase = locals.supabase;

  // 1. Sesión
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw redirect(303, '/auth/login');
  }

  // 2. ¿Es admin?
  const { data: roleRow, error: roleError } = await supabase
    .from('user_roles')
    .select('is_admin')
    .eq('user_id', session.user.id)
    .maybeSingle();

  if (roleError) {
    console.error('Error revisando rol admin:', roleError);
    throw error(500, 'Error revisando permisos');
  }

  if (!roleRow?.is_admin) {
    throw redirect(303, '/');
  }

  // 3. Leer id desde la URL
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    throw error(404, 'Perfil no encontrado');
  }

  // 4. Traer el perfil
  const { data: profile, error: profileError } = await supabase
    .from('worker_profiles')
    .select(
      `id,
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
       updated_at`
    )
    .eq('id', id)
    .maybeSingle();

  if (profileError) {
    console.error('Error cargando worker_profile:', profileError);
    throw error(500, 'Error cargando el perfil de trabajador');
  }

  if (!profile) {
    throw error(404, 'Perfil no encontrado');
  }

  return {
    profile
  };
};
