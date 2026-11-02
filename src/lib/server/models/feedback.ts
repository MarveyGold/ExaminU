import mongoose from "../db.js";
import type { InferSchemaType, Model } from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export type FeedbackDoc = InferSchemaType<typeof feedbackSchema>;

const Feedback: Model<FeedbackDoc> = mongoose.models.Feedback ?? mongoose.model("Feedback", feedbackSchema);
export default Feedback;
