import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false, minlength: 8 },
  bio: { type: String, maxlength: 500, default: "" },
  avatar: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  shoppingList: [{ text: { type: String, required: true, maxlength: 160 }, quantity: { type: Number, min: 1, max: 1000, default: 1 }, price: { type: Number, min: 0, max: 1000000, default: 0 }, image: { type: String, maxlength: 120000, default: "" }, done: { type: Boolean, default: false } }],
  resetTokenHash: String,
  resetTokenExpires: Date
}, { timestamps: true });
export default mongoose.model("User", userSchema);
