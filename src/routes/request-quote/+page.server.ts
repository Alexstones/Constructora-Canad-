import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/server/supabaseClient';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  // De momento no necesitamos nada extra en el load
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const phone = data.get('phone')?.toString().trim() || '';
    const city = data.get('city')?.toString().trim() || '';
    const service = data.get('service')?.toString().trim() || '';
    const budget = data.get('budget')?.toString().trim() || '';
    const startDate = data.get('startDate')?.toString().trim() || '';
    const details = data.get('details')?.toString().trim() || '';

    const values = {
      name,
      email,
      phone,
      city,
      service,
      budget,
      startDate,
      details
    };

    const errors: Record<string, string> = {};

    if (!name) errors.name = 'Ingresa tu nombre.';
    if (!email) errors.email = 'Ingresa tu correo.';
    if (!details) errors.details = 'Cuéntanos un poco sobre tu proyecto.';

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        success: false,
        errors,
        values
      });
    }

    // Insertar en la tabla quote_requests
    const { error } = await supabase.from('quote_requests').insert([
      {
        name,
        email,
        phone: phone || null,
        city: city || null,
        service: service || null,
        budget_range: budget || null,
        start_date: startDate || null,
        details,
        status: 'new',
        source: 'web'
      }
    ]);

    if (error) {
      console.error('Error guardando quote_request:', error);
      return fail(500, {
        success: false,
        errors: {
          general:
            'Hubo un problema al guardar tu solicitud. Intenta de nuevo en unos minutos.'
        },
        values
      });
    }

    // Éxito: limpiamos valores y mandamos mensaje
    return {
      success: true,
      message:
        'Hemos recibido tu solicitud. En breve nos pondremos en contacto contigo.',
      values: {}
    };
  }
};
