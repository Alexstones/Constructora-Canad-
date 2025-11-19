import type { Actions } from './$types';

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

    const errors: Record<string, string> = {};

    if (!name) errors.name = 'Por favor ingresa tu nombre.';
    if (!email) errors.email = 'Necesitamos un correo para contactarte.';
    if (!details) errors.details = 'Cuéntanos un poco sobre tu proyecto.';

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        values: { name, email, phone, city, service, budget, startDate, details }
      };
    }

    // Aquí podrías guardar en BD o enviar un correo
    console.log('NUEVA SOLICITUD DE COTIZACIÓN', {
      name,
      email,
      phone,
      city,
      service,
      budget,
      startDate,
      details
    });

    return {
      success: true
    };
  }
};
