import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 }, description: { type: String, required() { return this.status !== "draft"; }, default: "", maxlength: 3000 },
  image: { type: String, default: "" }, youtubeUrl: { type: String, default: "" }, videoUrl: { type: String, default: "", maxlength: 2048 }, author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  category: { type: String, required() { return this.status !== "draft"; }, maxlength: 60, default: "" }, cuisine: { type: String, maxlength: 60, default: "" }, type: { type: String, enum: ["Veg", "Non-Veg"], default: "Veg" },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" }, preparationTime: { type: Number, min: 0, default: 0 }, cookingTime: { type: Number, min: 0, default: 0 }, servings: { type: Number, min: 1, default: 1 },
  ingredients: [{ type: mongoose.Schema.Types.Mixed }], steps: [{ type: String, trim: true, maxlength: 1000 }], likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], comments: [{ author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: { type: String, maxlength: 1000 }, createdAt: { type: Date, default: Date.now } }], ratings: [{ author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, value: { type: Number, min: 1, max: 5 } }], views: { type: Number, default: 0 }, tags: [{ type: String, trim: true, maxlength: 40 }], status: { type: String, enum: ["draft", "published", "unpublished"], default: "published", index: true }
}, { timestamps: true });
recipeSchema.index({ title: "text", description: "text", ingredients: "text", cuisine: "text", category: "text" });
export default mongoose.model("Recipe", recipeSchema);
