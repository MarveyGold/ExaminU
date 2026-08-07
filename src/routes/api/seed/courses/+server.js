import { json } from '@sveltejs/kit';

import mongoose from '$lib/server/db.js';
import Course from '$lib/server/models/course.model.js';

export async function GET() {
  try {

    const documents = await Course.find({}).lean();
    return json(documents);
  } catch (err) {
    return json({ error: err?.message || String(err) }, { status: 500 });
  }
}
