import { Router } from "express";
import { addComment, createRecipe, deleteComment, deleteRecipe, getRecipe, listRecipes, rateRecipe, toggleFavorite, toggleLike, updateRecipe } from "../controllers/recipeController.js";
import { protect } from "../middleware/auth.js";
const router=Router();
router.get("/",listRecipes);router.get("/:id",getRecipe);router.post("/",protect,createRecipe);router.put("/:id",protect,updateRecipe);router.delete("/:id",protect,deleteRecipe);router.post("/:id/like",protect,toggleLike);router.post("/:id/favorite",protect,toggleFavorite);router.post("/:id/rating",protect,rateRecipe);router.post("/:id/comments",protect,addComment);router.delete("/:id/comments/:commentId",protect,deleteComment);
export default router;
