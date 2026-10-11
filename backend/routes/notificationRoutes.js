import { Router } from "express";
import Notification from "../models/Notification.js";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router=Router();router.get("/",protect,asyncHandler(async(req,res)=>{const notifications=await Notification.find({user:req.user.id}).populate("actor","name avatar").populate("recipe","title").sort({createdAt:-1}).limit(50);res.json({notifications,unread:notifications.filter(n=>!n.read).length});}));export default router;
