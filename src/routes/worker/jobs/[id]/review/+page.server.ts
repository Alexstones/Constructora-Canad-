import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
  const jobId = Number(params.id);

  if (!jobId || Number.isNaN(jobId)) {
    throw redirect(303, '/');
  }

  const { data: job, error } = await locals.supabase
    .from('jobs')
    .select('id, title, city, service, worker_id')
    .eq('id', jobId)
    .maybeSingle();

  if (error || !job) {
    console.error('Error cargando job para review:', error);
    throw redirect(303, '/');
  }

  return {
    job
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const jobId = Number(params.id);

    if (!jobId || Number.isNaN(jobId)) {
      return fail(400, { success: false, error: 'Job inválido' });
    }

    const data = await request.formData();
    const rating = Number(data.get('rating'));
    const comment = data.get('comment')?.toString().trim() || '';
    const client_email = data.get('client_email')?.toString().trim() || '';

    if (!rating || rating < 1 || rating > 5) {
      return fail(400, { success: false, error: 'Selecciona una calificación de 1 a 5 estrellas' });
    }

    // Obtener worker_id del job
    const { data: job, error: jobError } = await locals.supabase
      .from('jobs')
      .select('worker_id')
      .eq('id', jobId)
      .maybeSingle();

    if (jobError || !job) {
      console.error('Error obteniendo job en review action:', jobError);
      return fail(500, { success: false, error: 'No se pudo registrar la reseña' });
    }

    const { error } = await locals.supabase.from('reviews').insert([
      {
        job_id: jobId,
        worker_id: job.worker_id,
        client_email,
        rating,
        comment
      }
    ]);

    if (error) {
      console.error('Error guardando review:', error);
      return fail(500, { success: false, error: 'No se pudo guardar la reseña' });
    }

    return { success: true };
  }
};
