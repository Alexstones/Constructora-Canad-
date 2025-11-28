// src/routes/find-contractor/+page.server.ts
import type { PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('q')?.trim() ?? '';
  const cityFilter = url.searchParams.get('city')?.trim() ?? '';

  // Solo mostrar perfiles aprobados en la página pública
  let query = supabase
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
        is_approved
      `
    )
    .eq('is_approved', true);

  // Filtro por ciudad
  if (cityFilter) {
    query = query.ilike('city', `%${cityFilter}%`);
  }

  // Búsqueda por nombre / descripción
  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,bio.ilike.%${search}%`
    );
    // Si luego quieres agregar services, se puede hacer otro filtro tipo:
    // query = query.contains('services', [search.toLowerCase()]);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando worker_profiles en find-contractor:', error);
  }

  return {
    profiles: data ?? [],
    search,
    cityFilter,
    error: error
      ? 'No se pudieron cargar los perfiles en este momento. Intenta de nuevo más tarde.'
      : null
  };
};
