import Department from '$lib/server/models/department.model.js';
import Course from '$lib/server/models/course.model.js';
import Faculty from '$lib/server/models/faculty.model.js';

export async function load({ params, url }) {
  const { faculty, department } = params;
  const level = url.searchParams.get("level") ?? "100";

  // find the department by its code and facultyCode
  const foundDepartment = await Department.findOne({ code: department, facultyCode: faculty }).lean();
  if (!foundDepartment) {
    // return empty grouped courses structure expected by the UI
    return { faculty, department, level, courses: { "100level": [], "200level": [] }, facultyName: faculty, departmentName: department };
  }

  // fetch all courses that belong to this department (department.courses is an array of course codes)
  const courseCodes = Array.isArray(foundDepartment.courses) ? foundDepartment.courses : [];
  const courseDocs = courseCodes.length ? await Course.find({ code: { $in: courseCodes } }).lean() : [];

  // group courses by level into the same shape the UI expects: { "100level": [...], "200level": [...] }
  const courses = {};
  for (const doc of courseDocs) {
    const lvl = doc.level || 100;
    const key = `${lvl}level`;
    if (!courses[key]) courses[key] = [];
    courses[key].push({ name: doc.name, code: String(doc.code).toUpperCase(), term: doc.term, level: doc.level });
  }

  // ensure keys exist even if empty
  if (!courses['100level']) courses['100level'] = [];
  if (!courses['200level']) courses['200level'] = [];

  const facultyDoc = await Faculty.findOne({ code: faculty }).lean();

  return {
    faculty,
    department,
    level,
    courses,
    facultyName: facultyDoc?.name ?? faculty,
    departmentName: foundDepartment.name,
  };
}
