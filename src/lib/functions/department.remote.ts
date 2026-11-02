import { form, getRequestEvent } from "$app/server";
import { invalid, redirect } from "@sveltejs/kit";
import * as v from "valibot";
import "#lib/server/db.js";
import Department from "#lib/server/models/department.model.js";
import { saveDepartment, userLevel } from "#lib/server/department.js";

const code = v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(20));

export const chooseDepartment = form(
  v.object({ faculty: code, department: code }),
  async ({ faculty, department }, issue) => {
    const event = getRequestEvent();
    const f = faculty.toUpperCase();
    const d = department.toUpperCase();

    if (!(await Department.exists({ code: d, facultyCode: f }))) {
      invalid(issue.department("Choose a department from the list."));
    }

    await saveDepartment(event, f, d);
    const level = await userLevel(event.locals);
    redirect(303, `/b/${encodeURIComponent(f)}/${encodeURIComponent(d)}?level=${level}`);
  },
);
