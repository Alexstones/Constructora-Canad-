import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient';
import { fail } from '@sveltejs/kit';

// Cargar el perfil del trabajador logueado (si existe)
export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.session?.user;

  if (!user) {
    // No logueado → no hay perfil todavía
    return {
      profile: null
    };
  }

  // IMPORTANTE: usamos user_id, no id
  const { data: profile, error } = await supabase
    .from('worker_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error cargando worker_profile en /worker:', error);
  }

  return {
    profile: profile ?? null
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.session?.user;

    if (!user) {
      return fail(401, {
        success: false,
        error: 'Usuario no autenticado'
      });
    }

    const data = await request.formData();

    const full_name = data.get('full_name')?.toString().trim() || '';
    const city = data.get('city')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const bio = data.get('bio')?.toString().trim() || '';
    const years_experience = Number(data.get('years_experience') || 0) || 0;
    const worker_type = data.get('worker_type')?.toString() || '';

    const services = data.getAll('services').map((s) => s.toString());
    const certs = data.getAll('certs').map((c) => c.toString());

    // Validaciones básicas
    const errors: Record<string, string> = {};

    if (!full_name) errors.full_name = 'Ingresa tu nombre completo.';
    if (!city) errors.city = 'Ingresa tu ciudad.';
    if (!phone) errors.phone = 'Ingresa un teléfono de contacto.';
    if (!bio) errors.bio = 'Cuéntanos un poco sobre tu experiencia.';

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        success: false,
        errors,
        values: {
          full_name,
          city,
          phone,
          bio,
          years_experience,
          worker_type,
          services,
          certs
        }
      });
    }

    // Guardar / actualizar el perfil
    // IMPORTANTE: usamos user_id, no id
    const { error } = await supabase.from('worker_profiles').upsert({
      user_id: user.id,
      full_name,
      city,
      phone,
      bio,
      years_experience,
      worker_type,
      services,
      certs,
      updated_at: new Date().toISOString()
      // is_approved lo dejamos como está / valor por defecto
    });

    if (error) {
      console.error('Error guardando worker_profile en /worker:', error);
      return fail(500, {
        success: false,
        error: 'Hubo un problema al guardar tu perfil. Intenta de nuevo.',
        values: {
          full_name,
          city,
          phone,
          bio,
          years_experience,
          worker_type,
          services,
          certs
        }
      });
    }

    return {
      success: true
    };
  }
};
