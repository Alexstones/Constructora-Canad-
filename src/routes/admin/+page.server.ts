// src/routes/admin/+page.server.ts
import type { PageServerLoad } from './$types';

// De momento NO usamos locals.supabase aquí para evitar el error 500.
// Más adelante podemos volver a meter guardas de admin si configuramos hooks.server.ts.
export const load: PageServerLoad = async () => {
  return {
    // Puedes dejar el correo fijo o vacío, como prefieras
    userEmail: 'thegoldconstruction803@gmail.com'
  };
};

