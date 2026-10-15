import mongoose from "../db.js";
const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    exam: { type: String, enum: ["school", "post-utme"], default: "school" },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: String,
    instruction: String,
    key: { type: String, required: true, unique: true }, // hash used to block duplicates
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    submittedBy: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

export default mongoose.models.QuestionSubmission ??
  mongoose.model("QuestionSubmission", submissionSchema);
