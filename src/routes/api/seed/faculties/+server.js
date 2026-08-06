import { json } from '@sveltejs/kit';
import data from "../../../../../static/data/faculties.json"
import mongoose from '$lib/server/db.js'; // ensure DB is connected
import Faculty from '$lib/server/models/faculty.model.js';

export async function GET() {
  try {

    const documents = await Faculty.find({}).lean();
    return json(documents);
  } catch (err) {
    return json({ error: err?.message || String(err) }, { status: 500 });
  }
}
