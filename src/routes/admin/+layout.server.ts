// src/routes/admin/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const email = cookies.get('session_email');
  const role = cookies.get('session_role');

  if (!email || role !== 'admin') {
    throw redirect(303, '/auth/login');
  }

  return {
    sessionEmail: email
  };
};
