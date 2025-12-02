// src/routes/request-quote/+page.server.ts
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

    // 1) Insertar en la tabla quote_requests y devolver el registro insertado
    const {
      data: quote,
      error: quoteError
    } = await supabase
      .from('quote_requests')
      .insert([
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
      ])
      .select('id, email, city, service, budget_range, details')
      .single();

    if (quoteError || !quote) {
      console.error('Error guardando quote_request:', quoteError);
      return fail(500, {
        success: false,
        errors: {
          general:
            'Hubo un problema al guardar tu solicitud. Intenta de nuevo en unos minutos.'
        },
        values
      });
    }

    // 2) Crear un job asociado a esa quote_request
    // Asumimos que existe una tabla "jobs" con columna "quote_id"
    const jobTitle = service
      ? `Trabajo de ${service}`
      : 'Trabajo solicitado desde el formulario de cotización';

    const { error: jobError } = await supabase.from('jobs').insert([
      {
        quote_id: quote.id, // FK hacia quote_requests.id
        client_email: quote.email,
        city: quote.city,
        service: quote.service,
        budget: quote.budget_range,
        title: jobTitle,
        description: quote.details,
        status: 'new',
        is_unlocked_for_worker: false
      }
    ]);

    if (jobError) {
      // No rompemos la experiencia del cliente, solo lo logueamos
      console.error('Error creando job desde quote_request:', jobError);
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
