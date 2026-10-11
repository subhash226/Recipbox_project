import { Router } from "express";
import { addShopping, deleteShopping, getFavorites, getMyRecipes, getShopping, getUser, toggleFollow, updateProfile, updateShopping } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
const router=Router();router.get("/me/recipes",protect,getMyRecipes);router.get("/me/favorites",protect,getFavorites);router.get("/shopping-list",protect,getShopping);router.post("/shopping-list",protect,addShopping);router.patch("/shopping-list/:itemId",protect,updateShopping);router.delete("/shopping-list/:itemId",protect,deleteShopping);router.put("/profile",protect,updateProfile);router.get("/:id",getUser);router.post("/:id/follow",protect,toggleFollow);export default router;
