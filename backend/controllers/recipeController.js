import Recipe from "../models/Recipe.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const validRecipe = body => {
  const status = body.status || "published";
  if (!["draft", "published", "unpublished"].includes(status)) return "Recipe status is invalid.";
  if (typeof body.title !== "string" || !body.title.trim()) return "Recipe title is required.";
  if (status !== "draft") {
    for (const field of ["description", "category"]) {
      if (typeof body[field] !== "string" || !body[field].trim()) return `${field} is required.`;
    }
    if (!body.image) return "A recipe cover image is required before publishing.";
    if (!Array.isArray(body.ingredients) || body.ingredients.length === 0) return "Add at least one ingredient before publishing.";
    if (!Array.isArray(body.steps) || body.steps.length === 0) return "Add at least one cooking step before publishing.";
    if (body.preparationTime === undefined || body.preparationTime === "" || !Number.isFinite(Number(body.preparationTime)) || Number(body.preparationTime) < 0) return "Preparation time must be zero or more minutes.";
    if (body.cookingTime === undefined || body.cookingTime === "" || !Number.isFinite(Number(body.cookingTime)) || Number(body.cookingTime) < 0) return "Cooking time must be zero or more minutes.";
    if (!Number.isInteger(Number(body.servings)) || Number(body.servings) < 1) return "Servings must be a whole number greater than zero.";
  }
  if (body.type && !["Veg", "Non-Veg"].includes(body.type)) return "Food type is invalid.";
  if (body.difficulty && !["Easy", "Medium", "Hard"].includes(body.difficulty)) return "Difficulty is invalid.";
  if (body.youtubeUrl && !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(body.youtubeUrl)) return "Enter a valid YouTube URL.";
  if (body.videoUrl && !/^https:\/\/res\.cloudinary\.com\/[^/]+\/video\/upload\/\S+$/i.test(body.videoUrl)) return "Uploaded video must be hosted by Cloudinary.";
  const isImageUrl = /^https?:\/\//i.test(body.image || "");
  const isUploadedImage = typeof body.image === "string"
    && body.image.length <= 700000
    && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(body.image);
  if (body.image && !isImageUrl && !isUploadedImage) return "Image must be a valid URL or uploaded JPEG.";
  if (body.ingredients && (!Array.isArray(body.ingredients) || body.ingredients.length > 50 || body.ingredients.some(item => {
    if (typeof item === "string") return !item.trim() || item.length > 160;
    return !item || typeof item.name !== "string" || !item.name.trim() || item.name.length > 160 || typeof item.quantity !== "string" || !item.quantity.trim() || item.quantity.length > 80;
  }))) return "Each ingredient must have a quantity and name.";
  if (body.steps && (!Array.isArray(body.steps) || body.steps.length > 50 || body.steps.some(step => typeof step !== "string" || !step.trim() || step.length > 1000))) return "Cooking steps must be a list of up to 50 non-empty text items.";
  if (body.tags && (!Array.isArray(body.tags) || body.tags.length > 20 || body.tags.some(tag => typeof tag !== "string" || tag.length > 40))) return "Add up to 20 tags, each no longer than 40 characters.";
  return null;
};
export const listRecipes = asyncHandler(async (req,res)=>{const q={status:"published"};if(req.query.category)q.category=req.query.category;if(req.query.type)q.type=req.query.type;if(req.query.q)q.$text={$search:String(req.query.q).slice(0,100)};const rows=await Recipe.find(q).populate("author","name avatar").sort({createdAt:-1}).limit(100);res.json({recipes:rows});});
export const getRecipe = asyncHandler(async(req,res)=>{const r=await Recipe.findOneAndUpdate({_id:req.params.id,status:"published"},{$inc:{views:1}},{new:true}).populate("author","name avatar").populate("comments.author","name avatar");if(!r)return res.status(404).json({message:"Recipe not found."});res.json({recipe:r});});
export const createRecipe = asyncHandler(async(req,res)=>{
  const error=validRecipe(req.body);if(error)return res.status(400).json({message:error});
  const fields=["title","description","image","youtubeUrl","videoUrl","category","cuisine","type","difficulty","preparationTime","cookingTime","servings","ingredients","steps","tags","status"];
  const recipe=await Recipe.create({...Object.fromEntries(fields.filter(field=>req.body[field]!==undefined).map(field=>[field,req.body[field]])),author:req.user.id});
  res.status(201).json({recipe});
});
export const updateRecipe = asyncHandler(async(req,res)=>{
  const recipe=await Recipe.findById(req.params.id);if(!recipe)return res.status(404).json({message:"Recipe not found."});
  if(String(recipe.author)!==req.user.id)return res.status(403).json({message:"You cannot edit this recipe."});
  const fields=["title","description","image","youtubeUrl","videoUrl","category","cuisine","type","difficulty","preparationTime","cookingTime","servings","ingredients","steps","tags","status"];
  const updates=Object.fromEntries(fields.filter(field=>req.body[field]!==undefined).map(field=>[field,req.body[field]]));
  const error=validRecipe({...recipe.toObject(),...updates});if(error)return res.status(400).json({message:error});
  Object.assign(recipe,updates);await recipe.save();res.json({recipe});
});
export const deleteRecipe = asyncHandler(async(req,res)=>{const recipe=await Recipe.findById(req.params.id);if(!recipe)return res.status(404).json({message:"Recipe not found."});if(String(recipe.author)!==req.user.id)return res.status(403).json({message:"You cannot delete this recipe."});await recipe.deleteOne();res.json({message:"Recipe deleted."});});
export const toggleLike = asyncHandler(async(req,res)=>{const r=await Recipe.findById(req.params.id);if(!r)return res.status(404).json({message:"Recipe not found."});const i=r.likes.findIndex(x=>String(x)===req.user.id);if(i<0)r.likes.push(req.user.id);else r.likes.splice(i,1);await r.save();res.json({liked:i<0,likes:r.likes.length});});
export const toggleFavorite = asyncHandler(async(req,res)=>{const r=await Recipe.findById(req.params.id);if(!r)return res.status(404).json({message:"Recipe not found."});const i=req.user.favorites.findIndex(x=>String(x)===r.id);if(i<0)req.user.favorites.push(r.id);else req.user.favorites.splice(i,1);await req.user.save();res.json({favorited:i<0});});
export const rateRecipe = asyncHandler(async(req,res)=>{const value=Number(req.body.value);if(!Number.isInteger(value)||value<1||value>5)return res.status(400).json({message:"Rating must be from 1 to 5."});const r=await Recipe.findById(req.params.id);if(!r)return res.status(404).json({message:"Recipe not found."});const old=r.ratings.find(x=>String(x.author)===req.user.id);if(old)old.value=value;else r.ratings.push({author:req.user.id,value});await r.save();res.json({rating:r.ratings.reduce((s,x)=>s+x.value,0)/r.ratings.length,ratingsCount:r.ratings.length});});
export const addComment = asyncHandler(async(req,res)=>{const text=req.body.text?.trim();if(!text||text.length>1000)return res.status(400).json({message:"Comment must contain 1–1000 characters."});const r=await Recipe.findById(req.params.id);if(!r)return res.status(404).json({message:"Recipe not found."});r.comments.push({author:req.user.id,text});await r.save();await r.populate("comments.author","name avatar");res.status(201).json({comment:r.comments.at(-1)});});
export const deleteComment = asyncHandler(async(req,res)=>{const r=await Recipe.findById(req.params.id);if(!r)return res.status(404).json({message:"Recipe not found."});const c=r.comments.id(req.params.commentId);if(!c)return res.status(404).json({message:"Comment not found."});if(String(c.author)!==req.user.id)return res.status(403).json({message:"You can delete only your own comment."});c.deleteOne();await r.save();res.json({message:"Comment deleted."});});
