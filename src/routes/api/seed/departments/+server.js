import { json } from '@sveltejs/kit';
import data from "../../../../../static/data/departments.json"
import mongoose from '$lib/server/db.js';
import Department from '$lib/server/models/department.model.js';

export async function GET() {
  try {

    const documents = await Department.find({}).lean();
    return json(documents);
  } catch (err) {
    return json({ error: err?.message || String(err) }, { status: 500 });
  }
}
