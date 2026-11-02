import mongoose, { type InferSchemaType, type Model } from 'mongoose';

const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, uppercase: true, unique: true, index: true, trim: true },
  name: { type: String, required: true, trim: true },
  term: { type: Number, required: true, min: 1, max: 10 },
  level: { type: Number, required: true, enum: [100, 200, 300, 400, 500, 600, 700] } // add/adjust allowed levels as needed
}, { timestamps: true });

export type CourseDoc = InferSchemaType<typeof CourseSchema>;

const Course: Model<CourseDoc> = mongoose.models?.Course ?? mongoose.model('Course', CourseSchema);
export default Course;
