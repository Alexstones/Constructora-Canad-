// src/routes/admin/workers/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/services/supabaseClient'; // mismo import que usas en otros .server.ts

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
      profiles: [],
      error: 'Error cargando perfiles de trabajador'
    };
  }

  return {
    profiles: data ?? []
  };
};

export const actions: Actions = {
  // único action: toggle de aprobación
  default: async ({ request }) => {
    const form = await request.formData();
    const idRaw = form.get('id');
    const approveRaw = form.get('approve');

    const id = Number(idRaw);
    const approve = approveRaw === 'true';

    if (!id || Number.isNaN(id)) {
      return {
        success: false,
        error: 'ID de perfil inválido'
      };
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
      return {
        success: false,
        error: 'No se pudo actualizar el estado del perfil'
      };
    }

    return {
      success: true
    };
  }
};
