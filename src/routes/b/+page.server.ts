import { redirect } from "@sveltejs/kit";
import Faculty from "#lib/server/models/faculty.model.ts";
import { savedDepartment } from "#lib/server/department.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  // ?change is how people get back here to pick a different faculty
  if (!event.url.searchParams.has("change")) {
    const saved = await savedDepartment(event);

    if (saved) {
      redirect(
        303,
        `/b/${encodeURIComponent(saved.faculty)}/${encodeURIComponent(saved.department)}?level=${saved.level}`,
      );
    }
  }

  const faculties = await Faculty.find(
    {},
    { _id: 0, name: 1, code: 1 },
  ).lean();

  return {
    names: faculties.map((f) => f.name),
    codes: faculties.map((f) => f.code),
  };
};
