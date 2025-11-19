import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const name = data.get('name')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const subject = data.get('subject')?.toString().trim() || '';
    const message = data.get('message')?.toString().trim() || '';

    const errors: Record<string, string> = {};

    if (!name) errors.name = 'Por favor ingresa tu nombre.';
    if (!email) errors.email = 'Necesitamos un correo para responderte.';
    if (!message) errors.message = 'Escribe un mensaje o consulta.';

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        values: { name, email, subject, message }
      };
    }

    // Aquí podrías enviar un correo o guardar en BD
    console.log('NUEVO MENSAJE DE CONTACTO', {
      name,
      email,
      subject,
      message
    });

    return {
      success: true
    };
  }
};
