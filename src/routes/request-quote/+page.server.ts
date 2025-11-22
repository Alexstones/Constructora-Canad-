// src/routes/request-quote/+page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data = await request.formData();

    const name = (data.get('name') ?? '').toString().trim();
    const email = (data.get('email') ?? '').toString().trim();
    const phone = (data.get('phone') ?? '').toString().trim();
    const city = (data.get('city') ?? '').toString().trim();
    const service = (data.get('service') ?? '').toString().trim();
    const budget = (data.get('budget') ?? '').toString().trim();
    const startDate = (data.get('startDate') ?? '').toString().trim();
    const details = (data.get('details') ?? '').toString().trim();

    const errors: Record<string, string> = {};

    if (!name) errors.name = 'Por favor escribe tu nombre.';
    if (!email) errors.email = 'Por favor escribe tu correo.';
    if (!details) errors.details = 'Cuéntanos un poco sobre tu proyecto.';
    if (!service) errors.service = 'Selecciona un tipo de servicio.';

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        success: false,
        errors,
        values: { name, email, phone, city, service, budget, startDate, details }
      });
    }

    // Si el usuario está logueado, guardamos su id; si no, lo dejamos null
    const clientId = locals.user?.id ?? null;

    const { error } = await supabase
      .from('jobs')
      .insert({
        client_id: clientId,
        client_name: name,
        client_email: email,
        client_phone: phone || null,
        city: city || null,
        service_type: service || null,
        budget_range: budget || null,
        start_date_text: startDate || null,
        description: details,
        status: 'open'
      });

    if (error) {
      console.error('Error insertando job desde cotización:', error);
      return fail(500, {
        success: false,
        errors: {
          global:
            'Ocurrió un problema al guardar tu solicitud. Inténtalo de nuevo en unos minutos.'
        },
        values: { name, email, phone, city, service, budget, startDate, details }
      });
    }

    // Respuesta OK para el form (SvelteKit + enhance)
    return {
      success: true
    };
  }
};

