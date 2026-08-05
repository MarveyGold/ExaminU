#!/usr/bin/env node
/**
 * ESM seed script
 * Usage:
 *   MONGO_URI="mongodb://..." node scripts/seed-from-api.js /full/path/to/api.json
 *
 * Notes:
 * - This file is ESM. Ensure your project has "type": "module" in package.json or run with node --input-type=module.
 * - api.json is expected at the path you pass as the first argument (it's not required to be in the repo).
 */

import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';

// models (ESM)
import Faculty from '../src/lib/server/models/faculty.model.js';
import Department from '../src/lib/server/models/department.model.js';
import Course from '../src/lib/server/models/course.model.js';

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('Please set MONGO_URI env var.');
    process.exit(1);
  }

  const argPath = process.argv[2];
  if (!argPath) {
    console.error('Usage: MONGO_URI="..." node scripts/seed-from-api.js /path/to/api.json');
    process.exit(1);
  }

  const jsonPath = path.resolve(argPath);
  try {
    await fs.access(jsonPath);
  } catch (err) {
    console.error('api.json not found at', jsonPath);
    process.exit(1);
  }

  const raw = await fs.readFile(jsonPath, 'utf8');
  let faculties;
  try {
    faculties = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse JSON:', err.message);
    process.exit(1);
  }

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    for (const f of faculties) {
      const facultyCode = (f.code || '').toUpperCase().trim();
      const facultyName = f.name || '';

      // upsert faculty
      await Faculty.findOneAndUpdate(
        { code: facultyCode },
        { code: facultyCode, name: facultyName },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!Array.isArray(f.departments)) continue;

      for (const d of f.departments) {
        const deptCode = (d.code || '').toUpperCase().trim();
        const deptName = d.name || '';

        // collect course codes from all levels (100level, 200level, etc.)
        const courseCodes = [];
        const coursesObj = d.courses || {};
        for (const levelKey of Object.keys(coursesObj)) {
          const levelArr = coursesObj[levelKey] || [];
          for (const c of levelArr) {
            if (!c || !c.code) continue;
            const code = String(c.code).toUpperCase().trim();
            courseCodes.push(code);

            // upsert course record (name + term). Use term default 1 if missing
            const courseName = c.name || code;
            const term = typeof c.term === 'number' ? c.term : 1;
            await Course.findOneAndUpdate(
              { code },
              { code, name: courseName, term },
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          }
        }

        // upsert department with only course codes
        await Department.findOneAndUpdate(
          { code: deptCode, facultyCode },
          { code: deptCode, name: deptName, facultyCode, courses: courseCodes },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
