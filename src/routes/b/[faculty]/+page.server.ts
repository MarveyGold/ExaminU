import Faculty from "#lib/server/models/faculty.model.js";
import Department from "#lib/server/models/department.model.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { faculty } = params;

  const foundFaculty = await Faculty.findOne({ code: faculty }).lean();
  if (!foundFaculty) return { faculty, facultyName: faculty, departmentNames: [], departmentList: [] };

  const departments = await Department.find({ facultyCode: faculty }).lean();

  return {
    faculty,
    facultyName: foundFaculty.name,
    departmentNames: departments.map((d) => d.name),
    departmentList: departments.map((d) => d.code),
  };
};
