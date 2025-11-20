export const load = async ({ locals }) => {
  return {
    user: locals.session?.user ?? null,
    session: locals.session
  };
};
