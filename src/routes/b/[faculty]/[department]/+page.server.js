import Data from "$lib/server/models/data.js";

export async function load({ params, url }) {
  const { faculty, department } = params;
  const level = url.searchParams.get("level") ?? "100";

  const foundFaculty = await Data.findOne({ code: faculty }).lean();
  if (!foundFaculty) return { faculty, department, level, courses: {}, facultyName: faculty, departmentName: department };

  const foundDepartment = foundFaculty.departments.find((d) => d.code === department);
  if (!foundDepartment) return { faculty, department, level, courses: {}, facultyName: foundFaculty.name, departmentName: department };

  return {
    faculty,
    department,
    level,
    courses: foundDepartment.courses,
    facultyName: foundFaculty.name,
    departmentName: foundDepartment.name,
  };
}
