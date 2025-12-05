// src/routes/worker/jobs/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

// Cargar trabajos disponibles para el worker actual,
// filtrados por ciudad/servicios de su perfil
export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.session?.user;

  if (!user) {
    throw redirect(303, '/auth/login');
  }

  // Perfil del worker (para filtros)
  const { data: profile, error: profileError } = await supabase
    .from('worker_profiles')
    .select('city, services')
    .eq('id', user.id) // id = uuid del usuario (mismo que auth.users.id)
    .maybeSingle();

  if (profileError) {
    console.error('Error cargando worker_profile en /worker/jobs:', profileError);
  }

  // Base: solo trabajos nuevos
  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'new')
    .order('created_at', { ascending: false });

  // Filtro por ciudad (tomamos la primera parte antes de la coma)
  if (profile?.city) {
    const cityPart = profile.city.split(',')[0]?.trim();
    if (cityPart) {
      query = query.ilike('city', `%${cityPart}%`);
    }
  }

  // Filtro por primer servicio
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

  // Leer job_unlocks de ESTE worker
  const { data: unlocks, error: unlocksError } = await supabase
    .from('job_unlocks')
    .select('job_id')
    .eq('worker_id', user.id);

  if (unlocksError) {
    console.error('Error cargando job_unlocks:', unlocksError);
  }

  const unlockedIds = new Set<string>((unlocks ?? []).map((u: any) => u.job_id as string));

  // Agregar bandera is_unlocked_for_worker para el front
  const jobsWithFlag = (jobs ?? []).map((job: any) => ({
    ...job,
    is_unlocked_for_worker: unlockedIds.has(job.id as string)
  }));

  return {
    profile: profile ?? null,
    jobs: jobsWithFlag
  };
};

export const actions: Actions = {
  // Registrar que el worker desbloqueó ese job (demo, sin pagos aún)
  default: async ({ request, locals }) => {
    const user = locals.session?.user;

    if (!user) {
      return fail(401, { success: false, error: 'No autenticado' });
    }

    const form = await request.formData();
    const jobIdRaw = form.get('job_id');
    const jobId = jobIdRaw?.toString() ?? '';

    if (!jobId) {
      return fail(400, { success: false, error: 'ID de trabajo inválido' });
    }

    // 1) Registrar el unlock en job_unlocks (por worker y job)
    const { error: unlockError } = await supabase
      .from('job_unlocks')
      .upsert(
        {
          job_id: jobId,      // uuid
          worker_id: user.id, // uuid
          created_at: new Date().toISOString()
        },
        { onConflict: 'job_id,worker_id' } // evita error si ya existe
      );

    if (unlockError) {
      console.error('Error al registrar unlock de job:', unlockError);
      return fail(500, {
        success: false,
        error: 'No se pudo desbloquear el trabajo'
      });
    }

    // 2) Opcional: marcar el job como "en progreso" y asignar worker,
    //    solo si aún no tenía worker asignado.
    const { error: jobError } = await supabase
      .from('jobs')
      .update({
        worker_id: user.id,
        status: 'in_progress',
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .is('worker_id', null); // sólo si todavía está libre

    if (jobError) {
      console.error('Error al actualizar job tras unlock (no crítico):', jobError);
      // No rompemos la UX; igual dejamos success true porque el unlock sí se registró
    }

    return { success: true };
  }
};
