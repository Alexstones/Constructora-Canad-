// src/routes/admin/workers/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

// Cargar todos los perfiles de trabajador
export const load: PageServerLoad = async () => {
  const { data, error } = await supabase
    .from('worker_profiles')
    .select(
      [
        'id',
        'user_id',
        'full_name',
        'city',
        'phone',
        'services',
        'years_experience',
        'worker_type',
        'certs',
        'bio',
        'created_at',
        'updated_at',
        'is_approved'
      ].join(', ')
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando worker_profiles:', error);
    return {
      profiles: [] as any[],
      error: 'Error cargando perfiles de trabajador'
    };
  }

  return {
    profiles: (data ?? []) as any[]
  };
};

// Action para aprobar / despublicar perfiles
export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const idRaw = form.get('id');
    const approveRaw = form.get('approve');

    const id = typeof idRaw === 'string' ? Number(idRaw) : NaN;
    const approve = approveRaw === 'true';

    if (!id || Number.isNaN(id)) {
      return fail(400, {
        success: false,
        error: 'ID de perfil inválido'
      });
    }

    const { error } = await supabase
      .from('worker_profiles')
      .update({
        is_approved: approve,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Error actualizando is_approved:', error);
      return fail(500, {
        success: false,
        error: 'No se pudo actualizar el estado del perfil'
      });
    }

    return {
      success: true
    };
  }
};
