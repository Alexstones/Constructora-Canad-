// src/routes/admin/quotes/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect, error, fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';

export const load: PageServerLoad = async ({ cookies }) => {
  // Protección básica: solo admins (usando las cookies que ya estás poniendo en login)
  const role = cookies.get('session_role');
  const email = cookies.get('session_email');

  if (role !== 'admin' || !email) {
    throw redirect(303, '/auth/login');
  }

  // Traer solicitudes de cotización
  const { data, error: dbError } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (dbError) {
    console.error('Error cargando cotizaciones:', dbError);
    throw error(500, 'No se pudieron cargar las solicitudes de cotización.');
  }

  return {
    userEmail: email,
    quotes: data ?? []
  };
};

// Ejemplo de acción para eliminar una cotización
export const actions: Actions = {
  delete: async ({ request, cookies }) => {
    const role = cookies.get('session_role');

    if (role !== 'admin') {
      return fail(403, { message: 'No tienes permisos para eliminar.' });
    }

    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) {
      return fail(400, { message: 'Falta el id de la cotización.' });
    }

    const { error: deleteError } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error eliminando cotización:', deleteError);
      return fail(500, { message: 'No se pudo eliminar la cotización.' });
    }

    // Redirigimos de vuelta al listado
    throw redirect(303, '/admin/quotes');
  }
};

