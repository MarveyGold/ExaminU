import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const user = locals.user;
  if (!user) {
    return { user: null }
  }
  return {
    user: {
      id: user.id.toString(),
      email: user.email,
      role: user.role
    }
  }
}
