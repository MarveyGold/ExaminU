import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    unique: true,
    index: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  // term numbers in your data are 1 or 2; adjust enum if needed
  term: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, { timestamps: true });

const Course = mongoose.models?.Course || mongoose.model('Course', CourseSchema);
export default Course;
