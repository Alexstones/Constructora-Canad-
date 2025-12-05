// src/routes/admin/jobs/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient';
import { fail, redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

async function requireAdmin(cookies: Cookies) {
  const email = cookies.get('session_email');
  const role = cookies.get('session_role');

  if (!email || role !== 'admin') {
    throw redirect(303, '/auth/login');
  }
}

// Cargar todos los trabajos
export const load: PageServerLoad = async ({ cookies }) => {
  await requireAdmin(cookies);

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando jobs:', error);
    return {
      jobs: [],
      loadError: 'No se pudieron cargar los trabajos.'
    };
  }

  return {
    jobs: jobs ?? []
  };
};

export const actions: Actions = {
  // Crear un nuevo trabajo
  create: async ({ request, cookies }) => {
    await requireAdmin(cookies);

    const form = await request.formData();

    const title = form.get('title')?.toString().trim() ?? '';
    const city = form.get('city')?.toString().trim() ?? '';
    const service_type = form.get('service_type')?.toString().trim() ?? '';
    const budget_min_raw = form.get('budget_min')?.toString().trim() ?? '';
    const budget_max_raw = form.get('budget_max')?.toString().trim() ?? '';
    const status = form.get('status')?.toString().trim() || 'open';
    const description = form.get('description')?.toString().trim() ?? '';

    const errors: Record<string, string> = {};

    if (!title) errors.title = 'El título es obligatorio.';
    if (!description) errors.description = 'Agrega una breve descripción.';

    const budget_min = budget_min_raw ? Number(budget_min_raw) : null;
    const budget_max = budget_max_raw ? Number(budget_max_raw) : null;

    if (budget_min_raw && Number.isNaN(budget_min)) {
      errors.budget_min = 'Presupuesto mínimo inválido.';
    }
    if (budget_max_raw && Number.isNaN(budget_max)) {
      errors.budget_max = 'Presupuesto máximo inválido.';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        action: 'create',
        errors,
        values: {
          title,
          city,
          service_type,
          budget_min: budget_min_raw,
          budget_max: budget_max_raw,
          status,
          description
        }
      });
    }

    const { error } = await supabase.from('jobs').insert([
      {
        title,
        city,
        service_type,
        budget_min,
        budget_max,
        status,
        description
      }
    ]);

    if (error) {
      console.error('Error creando job:', error);
      return fail(500, {
        action: 'create',
        errors: {
          general: 'No se pudo crear el trabajo. Intenta de nuevo.'
        }
      });
    }

    throw redirect(303, '/admin/jobs');
  },

  // Cambiar estado
  update_status: async ({ request, cookies }) => {
    await requireAdmin(cookies);

    const form = await request.formData();
    const id = form.get('id')?.toString();
    const status = form.get('status')?.toString();

    if (!id || !status) {
      return fail(400, {
        action: 'update_status',
        errors: { general: 'Datos incompletos.' }
      });
    }

    const { error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error actualizando estado del job:', error);
      return fail(500, {
        action: 'update_status',
        errors: { general: 'No se pudo actualizar el estado.' }
      });
    }

    throw redirect(303, '/admin/jobs');
  },

  // Eliminar
  delete: async ({ request, cookies }) => {
    await requireAdmin(cookies);

    const form = await request.formData();
    const id = form.get('id')?.toString();

    if (!id) {
      return fail(400, {
        action: 'delete',
        errors: { general: 'ID faltante.' }
      });
    }

    const { error } = await supabase.from('jobs').delete().eq('id', id);

    if (error) {
      console.error('Error eliminando job:', error);
      return fail(500, {
        action: 'delete',
        errors: { general: 'No se pudo eliminar el trabajo.' }
      });
    }

    throw redirect(303, '/admin/jobs');
  }
};
