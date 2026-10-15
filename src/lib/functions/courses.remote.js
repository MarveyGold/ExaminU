import { query } from "$app/server";
import { error } from "@sveltejs/kit";
import "#lib/server/db.js";
import Course from "#lib/server/models/course.model.js";

export const getCourses = query(async () => {
  try {
    const documents = await Course.find().lean();
    return documents.map((doc) => ({ ...doc, _id: doc._id.toString() }));
  } catch (err) {
    console.error("getCourses failed:", err);
    error(500, "Could not load courses");
  }
});

export const getCourseCodes = query(async () => {
  try {
    const documents = await Course.find({}, "code").lean();
    return documents.map((doc) => doc.code);
  } catch (err) {
    console.error("getCourseCodes failed:", err);
    error(500, "Could not load courses");
  }
});
