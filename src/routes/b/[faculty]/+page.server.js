import Faculty from "$lib/server/models/faculty.model.js";
import Department from "$lib/server/models/department.model.js";

export async function load({ params }) {
  const { faculty } = params;

  // find faculty document
  const foundFaculty = await Faculty.findOne({ code: faculty }).lean();
  if (!foundFaculty) return { faculty, facultyName: faculty, departmentNames: [], departmentList: [] };

  // find departments that belong to this faculty
  const departments = await Department.find({ facultyCode: faculty }).lean();

  return {
    faculty,
    facultyName: foundFaculty.name,
    departmentNames: departments.map((d) => d.name),
    departmentList: departments.map((d) => d.code),
  };
}
