// src/routes/account/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
  const email = cookies.get('session_email');
  const role = cookies.get('session_role');

  if (!email) {
    throw redirect(303, '/auth/login');
  }

  return {
    email,
    role
  };
};
