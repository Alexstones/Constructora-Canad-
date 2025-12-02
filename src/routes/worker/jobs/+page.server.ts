// src/routes/worker/jobs/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.session?.user;

  if (!user) {
    throw redirect(303, '/auth/login');
  }

  // Traemos el perfil del worker para usar ciudad / servicios como filtro
  const { data: profile, error: profileError } = await supabase
    .from('worker_profiles')
    .select('city, services')
    .eq('user_id', user.id)
    .maybeSingle();

  if (profileError) {
    console.error('Error cargando worker_profile en /worker/jobs:', profileError);
  }

  // Base: trabajos con estado "new"
  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'new')
    .order('created_at', { ascending: false });

  // Filtro por ciudad (tomamos solo la primera parte antes de la coma)
  if (profile?.city) {
    const cityPart = profile.city.split(',')[0]?.trim();
    if (cityPart) {
      query = query.ilike('city', `%${cityPart}%`);
    }
  }

  // Filtro por primer servicio del perfil
  if (profile?.services && profile.services.length > 0) {
    const firstService = profile.services[0];
    if (firstService) {
      query = query.ilike('service', `%${firstService}%`);
    }
  }

  const { data: jobs, error: jobsError } = await query;

  if (jobsError) {
    console.error('Error cargando jobs para worker:', jobsError);
    return {
      profile: profile ?? null,
      jobs: [],
      error: 'Error cargando trabajos disponibles'
    };
  }

  return {
    profile: profile ?? null,
    jobs: jobs ?? []
  };
};

export const actions: Actions = {
  // Acción simple: "desbloquear" la info de un job (demo)
  default: async ({ request, locals }) => {
    const user = locals.session?.user;

    if (!user) {
      return fail(401, { success: false, error: 'No autenticado' });
    }

    const form = await request.formData();
    const jobIdRaw = form.get('job_id');
    const jobId = Number(jobIdRaw);

    if (!jobId || Number.isNaN(jobId)) {
      return fail(400, { success: false, error: 'ID de trabajo inválido' });
    }

    const { error } = await supabase
      .from('jobs')
      .update({
        is_unlocked_for_worker: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId);

    if (error) {
      console.error('Error al desbloquear info de job:', error);
      return fail(500, {
        success: false,
        error: 'No se pudo desbloquear el trabajo'
      });
    }

    return { success: true };
  }
};
