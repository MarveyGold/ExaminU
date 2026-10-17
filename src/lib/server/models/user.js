
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
  name: { type: String, trim: true, maxlength: 60, default: "user" },
  username: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
  level: { type: String, enum: ["100", "200", "300", "400", "500", "600"], default: "100" },
  faculty: { type: String, uppercase: true, trim: true },
  department: { type: String, uppercase: true, trim: true },
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
