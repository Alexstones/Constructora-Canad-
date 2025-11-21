import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/services/supabaseClient';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.session?.user;

  if (!user) {
    return {
      profile: null
    };
  }

  // Buscar si el trabajador ya tiene perfil guardado
  const { data: profile } = await supabase
    .from('worker_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return {
    profile
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.session?.user;

    if (!user) {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const data = await request.formData();

    const full_name = data.get('full_name')?.toString() || '';
    const city = data.get('city')?.toString() || '';
    const phone = data.get('phone')?.toString() || '';
    const bio = data.get('bio')?.toString() || '';
    const years_experience = Number(data.get('years_experience')) || 0;
    const worker_type = data.get('worker_type')?.toString() || '';
    const services = data.getAll('services').map(s => s.toString());
    const certs = data.getAll('certs').map(c => c.toString());

    // Guardar en Supabase
    const { error } = await supabase
      .from('worker_profiles')
      .upsert({
        id: user.id,
        full_name,
        city,
        phone,
        bio,
        years_experience,
        worker_type,
        services,
        certs,
        updated_at: new Date()
      });

    if (error) {
      console.log('Error guardando worker profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  }
};
