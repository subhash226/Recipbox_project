import mongoose from "mongoose";
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true},actor:{type:mongoose.Schema.Types.ObjectId,ref:"User"},type:{type:String,enum:["like","rating","comment","follow"],required:true},recipe:{type:mongoose.Schema.Types.ObjectId,ref:"Recipe"},read:{type:Boolean,default:false}}, {timestamps:true});
export default mongoose.model("Notification",schema);
