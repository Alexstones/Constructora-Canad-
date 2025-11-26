// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const role = cookies.get('session_role');      // 'admin' | 'worker' | undefined
  const email = cookies.get('session_email');    // string | undefined

  // Si no hay email, consideramos que no hay usuario
  if (!email) {
    return {
      user: null,
      userRole: null
    };
  }

  return {
    user: { email },                      // lo que usas como data.user
    userRole: { is_admin: role === 'admin' } // lo que usas como data.userRole
  };
};
