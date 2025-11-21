import type { PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient'; // Ajusta la ruta si tu client está en otro lado

export const load: PageServerLoad = async () => {
  // Traemos trabajos con estado "open"
  const { data: availableJobs, error: jobsError } = await supabase
    .from('jobs')
    .select(
      `
        id,
        title,
        description,
        city,
        service_type,
        budget_min,
        budget_max,
        status,
        created_at
      `
    )
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (jobsError) {
    console.error('Error cargando jobs:', jobsError);
  }

  // Más adelante esto vendrá de worker_jobs
  const unlockedJobs: any[] = [];

  const stats = {
    openJobsCount: availableJobs?.length ?? 0,
    unlockedJobsCount: unlockedJobs.length,
    completedJobsCount: 0
  };

  return {
    availableJobs: availableJobs ?? [],
    unlockedJobs,
    stats
  };
};
