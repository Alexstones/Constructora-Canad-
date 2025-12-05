// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  // De Supabase (por si sigues usando hooks con session)
  const supaUser = locals.session?.user ?? null;

  // De cookies que ponemos en el login
  const cookieEmail = cookies.get('session_email') ?? null;
  const cookieRole = cookies.get('session_role') ?? null;

  // Armamos un objeto "user" compatible con tu layout actual
  const user = supaUser
    ? { id: supaUser.id, email: supaUser.email }
    : cookieEmail
    ? { id: null, email: cookieEmail }
    : null;

  // userRole con is_admin (lo usas en el header)
  const userRole =
    cookieRole === 'admin'
      ? { is_admin: true }
      : cookieRole === 'worker'
      ? { is_admin: false }
      : null;

  return {
    user,
    userRole
  };
};
