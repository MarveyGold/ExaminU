import Data from "$lib/server/models/data.js";

export async function load({ params }) {
  const { faculty } = params;

  const foundFaculty = await Data.findOne({ code: faculty }).lean();
  if (!foundFaculty) return { faculty, facultyName: faculty, departmentNames: [], departmentList: [] };

  return {
    faculty,
    facultyName: foundFaculty.name,
    departmentNames: foundFaculty.departments.map((d) => d.name),
    departmentList: foundFaculty.departments.map((d) => d.code),
  };
}
