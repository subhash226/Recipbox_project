import { Router } from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const Report=new mongoose.Schema({recipe:{type:mongoose.Schema.Types.ObjectId,ref:"Recipe",required:true},reporter:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},reason:{type:String,enum:["Inappropriate content","Spam","Copyright issue","Incorrect information","Other"],required:true},details:{type:String,maxlength:1000}},{timestamps:true});
const ReportModel=mongoose.models.Report||mongoose.model("Report",Report);const router=Router();router.post("/:recipeId",protect,asyncHandler(async(req,res)=>{const allowed=["Inappropriate content","Spam","Copyright issue","Incorrect information","Other"];if(!allowed.includes(req.body.reason))return res.status(400).json({message:"Choose a valid report reason."});await ReportModel.create({recipe:req.params.recipeId,reporter:req.user.id,reason:req.body.reason,details:req.body.details||""});res.status(201).json({message:"Report submitted."});}));export default router;
