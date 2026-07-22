import mongoose from "../db.js";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mail: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
