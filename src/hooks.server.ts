import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // por ahora no hacemos nada especial, solo dejamos pasar la request
  return resolve(event);
};
