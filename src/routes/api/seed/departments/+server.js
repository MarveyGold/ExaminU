import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

import mongoose from '$lib/server/db.js';
import Department from '$lib/server/models/department.model.js';

export async function GET({ url }) {
  if (url.searchParams.get('force') !== 'true') {
    return json({ error: 'Missing force=true query param. Seed aborted for safety.' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'static', 'data', 'departments.json');
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const docs = JSON.parse(raw);

    let insertedCount = 0;
    let seedError = null;

    try {
      const res = await Department.insertMany(docs, { ordered: false });
      insertedCount = Array.isArray(res) ? res.length : 0;
    } catch (err) {
      if (err && Array.isArray(err.insertedDocs)) insertedCount = err.insertedDocs.length;
      seedError = err.message || String(err);
    }

    const all = await Department.find({}).lean();
    return json({ insertedCount, error: seedError, documents: all });
  } catch (err) {
    return json({ error: err.message || String(err) }, { status: 500 });
  }
}
