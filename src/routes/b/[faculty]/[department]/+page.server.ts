import Department from "#lib/server/models/department.model.ts";
import Course from "#lib/server/models/course.model.ts";
import Faculty from "#lib/server/models/faculty.model.ts";
import type { PageServerLoad } from "./$types";

type CourseItem = {
  name: string;
  code: string;
  term: number;
  level: number;
};

type GroupedCourses = {
  "100level": CourseItem[];
  "200level": CourseItem[];
};

export const load: PageServerLoad = async ({ params, url }) => {
  const { faculty, department } = params;
  const level = url.searchParams.get("level") ?? "100";

  const foundDepartment = await Department.findOne({
    code: department,
    facultyCode: faculty,
  }).lean();

  if (!foundDepartment) {
    return {
      faculty,
      department,
      level,
      courses: {
        "100level": [],
        "200level": [],
      } satisfies GroupedCourses,
      facultyName: faculty,
      departmentName: department,
    };
  }

  const courseCodes = Array.isArray(foundDepartment.courses)
    ? foundDepartment.courses
    : [];

  const courseDocs = courseCodes.length
    ? await Course.find({ code: { $in: courseCodes } }).lean()
    : [];

  const courses: GroupedCourses = {
    "100level": [],
    "200level": [],
  };

  for (const doc of courseDocs) {
    const key = `${doc.level || 100}level`;

    if (key === "100level" || key === "200level") {
      courses[key].push({
        name: doc.name,
        code: String(doc.code).toUpperCase(),
        term: doc.term,
        level: doc.level,
      });
    }
  }

  const facultyDoc = await Faculty.findOne({ code: faculty }).lean();

  return {
    faculty,
    department,
    level,
    courses,
    facultyName: facultyDoc?.name ?? faculty,
    departmentName: foundDepartment.name,
  };
};
