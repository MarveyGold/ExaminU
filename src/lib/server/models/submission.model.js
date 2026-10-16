import mongoose from "../db.js";
const { Schema } = mongoose;

const isQuestion = function() {
  return this.kind === "question";
};

const submissionSchema = new Schema(
  {
    kind: { type: String, enum: ["question", "file"], default: "question", index: true },

    // course code. Required for typed questions, optional for files
    title: { type: String, required: isQuestion, index: true },
    exam: { type: String, enum: ["school", "post-utme"], default: "school" },

    // typed questions
    question: { type: String, required: isQuestion },
    options: { type: [String] },
    correctAnswer: { type: String, required: isQuestion },
    explanation: String,
    instruction: String,

    // uploaded files, stored as is
    file: {
      name: String,
      mimeType: String,
      size: Number,
      data: { type: Buffer, select: false }, // left out of normal queries so lists stay fast
    },
    note: String,

    key: { type: String, required: true, unique: true }, // question hash, or the file's content hash
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    submittedBy: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

export default mongoose.models.QuestionSubmission ??
  mongoose.model("QuestionSubmission", submissionSchema);
