import mongoose from "../db.js"
const { Schema } = mongoose;
const quizSchema = new Schema({
  title: { type: String, trim: true },
  id: Number,
  exam: { type: String, default: "post-utme" },
  question: { type: String, trim: true },
  options: [String],
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  optionE: String,
  correctAnswer: String,
  explanation: String
});
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz
