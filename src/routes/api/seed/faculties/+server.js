import { json } from '@sveltejs/kit';

import mongoose from '$lib/server/db.js'; // ensure DB is connected
import Faculty from '$lib/server/models/faculty.model.js';

export async function GET() {
  try {
    // rely on existing db connector (top-level connect in src/lib/server/db.js)
    const documents = await Faculty.find({}).lean();
    return json({ documents });
  } catch (err) {
    return json({ error: err?.message || String(err) }, { status: 500 });
  }
}
