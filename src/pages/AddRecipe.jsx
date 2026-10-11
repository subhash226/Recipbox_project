import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const MAX_IMAGE_DATA_URL_LENGTH = 700_000;

async function compressImage(file) {
	const bitmap = await createImageBitmap(file);
	const canvas = document.createElement("canvas");
	let scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
	let dataUrl = "";

	for (let attempt = 0; attempt < 8; attempt += 1) {
		canvas.width = Math.round(bitmap.width * scale);
		canvas.height = Math.round(bitmap.height * scale);
		const context = canvas.getContext("2d");
		if (!context) throw new Error("Image preview is not supported in this browser.");
		context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		dataUrl = canvas.toDataURL("image/jpeg", 0.82 - attempt * 0.06);
		if (dataUrl.length <= MAX_IMAGE_DATA_URL_LENGTH) break;
		scale *= 0.8;
	}

	bitmap.close();
	if (dataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
		throw new Error("Choose a smaller image file and try again.");
	}
	return dataUrl;
}

export default function AddRecipe() {
 const navigate=useNavigate();const [image,setImage]=useState("");const [message,setMessage]=useState("");
 const submit=async e=>{e.preventDefault();setMessage("");const f=new FormData(e.currentTarget);const title=f.get("title").trim();if(!title){setMessage("Add a recipe name to continue.");return;}const payload={title,description:f.get("description"),category:f.get("category"),cuisine:f.get("cuisine"),type:f.get("type"),difficulty:f.get("difficulty"),preparationTime:Number(f.get("prep"))||0,cookingTime:Number(f.get("cook"))||0,servings:Number(f.get("servings"))||4,image:image||"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=85",youtubeUrl:f.get("youtubeUrl"),ingredients:f.get("ingredients").split("\n").map(x=>x.trim()).filter(Boolean),steps:f.get("steps").split("\n").map(x=>x.trim()).filter(Boolean),status:"published"};try{const d=await api("/recipes",{method:"POST",body:payload,auth:true});window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:"Recipe published"}));navigate(`/recipe/${d.recipe._id}`);}catch(err){setMessage(err.message)}};
 return <section className="page-section form-page"><Link to="/recipes" className="back-link">← Back to recipes</Link><div className="page-title"><span className="eyebrow">CREATE</span><h1>Share Your Recipe</h1><p>Turn your favorite dish into a recipe the community can enjoy.</p></div><form className="recipe-form" onSubmit={submit}><div className="upload-box">{image?<img className="recipe-image-preview" src={image} alt="Recipe image preview"/>:"📸"}<h3>Upload recipe image</h3><p>Choose a food photo to add to your recipe.</p><label className="image-upload-control">Choose image<input aria-label="Upload recipe image" type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith("image/")){setMessage("Choose an image file to upload.");return;}try{setMessage("");setImage(await compressImage(file));}catch(error){setMessage(error.message||"Could not process that image.");}}}/></label></div><div className="form-grid"><label>Recipe title<input name="title" required placeholder="e.g. Creamy Garlic Pasta"/></label><label>Category<select name="category">{["Breakfast","Lunch","Dinner","Snacks","Desserts","Drinks","Indian","Chinese","Italian"].map(x=><option key={x}>{x}</option>)}</select></label><label>Cuisine<input name="cuisine" placeholder="e.g. South Indian"/></label><label>Preparation Time (min)<input name="prep" type="number" min="0" placeholder="15"/></label><label>Cooking time (min)<input name="cook" type="number" min="0" placeholder="30"/></label><label>Servings<input name="servings" type="number" min="1" placeholder="4"/></label><label>Difficulty<select name="difficulty"><option>Easy</option><option>Medium</option><option>Hard</option></select></label><label>Food Type<select name="type"><option>Veg</option><option>Non-Veg</option></select></label></div><label>Description<textarea name="description" required placeholder="What makes this recipe special?"/></label><label>Ingredients<textarea name="ingredients" required placeholder="Enter ingredients, one per line..."/></label><label>Instructions<textarea name="steps" required rows="7" placeholder="Write step-by-step instructions, one per line..."/></label><label>YouTube video link<input name="youtubeUrl" type="url" placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxx"/></label>{message&&<p className="form-error" role="alert">{message}</p>}<div className="form-actions"><button className="btn secondary" type="button" onClick={()=>setMessage("Your recipe details are ready. Add a name and publish to save this draft locally.")}>Save Draft</button><button className="btn primary" type="submit">Publish Recipe</button></div></form></section>;
}
