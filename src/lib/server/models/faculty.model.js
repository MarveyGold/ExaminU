import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
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
  }
}, { timestamps: true });

const Faculty = mongoose.models?.Faculty || mongoose.model('Faculty', FacultySchema);
export default Faculty;
