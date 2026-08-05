import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  facultyCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    index: true
  },
  // store only course codes (strings), e.g., ["COS101","MTH101"]
  courses: [{
    type: String,
    uppercase: true,
    trim: true
  }]
}, { timestamps: true });

// ensure department code is unique per faculty
DepartmentSchema.index({ code: 1, facultyCode: 1 }, { unique: true });

const Department = mongoose.models?.Department || mongoose.model('Department', DepartmentSchema);
export default Department;
