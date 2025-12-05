// src/routes/worker/profile/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient'; // 👈 RUTA CORRECTA

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.session?.user;

  // Si no está logueado, mándalo al login
  if (!user) {
    throw redirect(303, '/auth/login');
  }

  // Buscar si el trabajador ya tiene perfil guardado
  const { data: profile, error } = await supabase
    .from('worker_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Error cargando worker_profile:', error);
  }

  return {
    profile: profile ?? null
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.session?.user;

    if (!user) {
      throw redirect(303, '/auth/login');
    }

    const data = await request.formData();

    const full_name = data.get('full_name')?.toString().trim() || '';
    const city = data.get('city')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const bio = data.get('bio')?.toString().trim() || '';
    const years_experience_raw = data.get('years_experience')?.toString().trim() || '';
    const worker_type = data.get('worker_type')?.toString().trim() || '';

    const services = data.getAll('services').map((s) => s.toString());
    const certs = data.getAll('certs').map((c) => c.toString());

    const errors: Record<string, string> = {};

    if (!full_name) errors.full_name = 'Ingresa tu nombre completo.';
    if (!city) errors.city = 'Ingresa tu ciudad.';
    if (!phone) errors.phone = 'Ingresa un teléfono de contacto.';
    if (!bio) errors.bio = 'Cuéntanos un poco sobre tu experiencia.';

    let years_experience: number | null = null;
    if (years_experience_raw) {
      const parsed = Number.parseInt(years_experience_raw, 10);
      if (Number.isNaN(parsed)) {
        errors.years_experience = 'Años de experiencia debe ser un número.';
      } else {
        years_experience = parsed;
      }
    }

    if (services.length === 0) {
      errors.services = 'Selecciona al menos un servicio.';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        success: false,
        errors,
        values: {
          full_name,
          city,
          phone,
          bio,
          years_experience: years_experience_raw,
          worker_type,
          services,
          certs
        }
      });
    }

    // Ver si ya existe un perfil para este user_id
    const { data: existing, error: existingError } = await supabase
      .from('worker_profiles')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (existingError && existingError.code !== 'PGRST116') {
      console.error('Error buscando worker_profile existente:', existingError);
      return fail(500, {
        success: false,
        errors: {
          general: 'Hubo un problema al guardar tu perfil. Intenta de nuevo.'
        },
        values: {
          full_name,
          city,
          phone,
          bio,
          years_experience: years_experience_raw,
          worker_type,
          services,
          certs
        }
      });
    }

    const payload = {
      full_name,
      city,
      phone,
      bio,
      years_experience,
      worker_type: worker_type || null,
      services,
      certs,
      user_id: user.id
    };

    let dbError;

    if (existing?.id) {
      const { error } = await supabase
        .from('worker_profiles')
        .update(payload)
        .eq('id', existing.id);
      dbError = error;
    } else {
      const { error } = await supabase.from('worker_profiles').insert([payload]);
      dbError = error;
    }

    if (dbError) {
      console.error('Error guardando worker profile:', dbError);
      return fail(500, {
        success: false,
        errors: {
          general: 'Hubo un problema al guardar tu perfil. Intenta de nuevo.'
        },
        values: {
          full_name,
          city,
          phone,
          bio,
          years_experience: years_experience_raw,
          worker_type,
          services,
          certs
        }
      });
    }

    return { success: true };
  }
};
