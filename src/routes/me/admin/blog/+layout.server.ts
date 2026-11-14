import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  if (locals.user?.role !== 'admin') redirect(303, '/login');
};
