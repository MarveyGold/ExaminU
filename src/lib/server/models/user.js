
import mongoose from "../db.js";

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },
  notifs: { type: Boolean, default: true },

  role: {
    type: String,
    default: "user"
  }

}, {
  timestamps: true
});

export const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);
