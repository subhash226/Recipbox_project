import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const MAX_IMAGE_DATA_URL_LENGTH = 700_000;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

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
  if (dataUrl.length > MAX_IMAGE_DATA_URL_LENGTH) throw new Error("Choose a smaller image file and try again.");
  return dataUrl;
}

async function uploadCookingVideo(file) {
  const signature = await api("/uploads/signature", { method: "POST", auth: true });
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", signature.timestamp);
  formData.append("folder", signature.folder);
  formData.append("signature", signature.signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/video/upload`, {
    method: "POST",
    body: formData
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Could not upload the cooking video.");
  }
  return result.secure_url;
}

export default function AddRecipePage({ recipeId } = {}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [values, setValues] = useState({ title: "", description: "", category: "Breakfast", type: "Veg", difficulty: "Easy", prep: "", cook: "", servings: "4", youtubeUrl: "", cuisine: "" });
  const [image, setImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [ingredients, setIngredients] = useState([{ quantity: "", name: "" }]);
  const [steps, setSteps] = useState([""]);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(recipeId));

  useEffect(() => {
    if (!recipeId) return;
    let active = true;
    api("/users/me/recipes", { auth: true }).then(({ recipes: ownRecipes = [] }) => {
      const recipe = ownRecipes.find(item => item._id === recipeId);
      if (!recipe) throw new Error("Recipe not found in your recipes.");
      if (!active) return;
      setValues({
        title: recipe.title || "", description: recipe.description || "", category: recipe.category || "Other",
        type: recipe.type || "Veg", difficulty: recipe.difficulty || "Easy", prep: String(recipe.preparationTime ?? ""),
        cook: String(recipe.cookingTime ?? ""), servings: String(recipe.servings || 4), youtubeUrl: recipe.youtubeUrl || "", cuisine: recipe.cuisine || ""
      });
      setImage(recipe.image || "");
      setVideoUrl(recipe.videoUrl || "");
      setIngredients(recipe.ingredients?.length ? recipe.ingredients.map(item => typeof item === "string" ? { quantity: "", name: item } : { quantity: item.quantity || "", name: item.name || "" }) : [{ quantity: "", name: "" }]);
      setSteps(recipe.steps?.length ? recipe.steps : [""]);
      setTags((recipe.tags || []).join(", "));
    }).catch(error => { if (active) setMessage(error.message); }).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [recipeId]);

  const updateValue = (field, value) => setValues(current => ({ ...current, [field]: value }));

  const submit = async event => {
    event.preventDefault();
    setMessage("");
    setIsPublishing(true);
    const status = event.nativeEvent.submitter?.value === "draft" ? "draft" : "published";
    const cleanIngredients = ingredients.filter(item => item.quantity.trim() && item.name.trim());
    const cleanSteps = steps.map(step => step.trim()).filter(Boolean);
    if (!values.title.trim()) {
      setMessage("Add a recipe name to continue.");
      setIsPublishing(false);
      return;
    }
    if (status === "published" && (!image || !values.description.trim() || !values.category || values.prep === "" || values.cook === "" || values.servings === "" || Number(values.prep) < 0 || Number(values.cook) < 0 || Number(values.servings) < 1 || !cleanIngredients.length || cleanIngredients.length !== ingredients.filter(item => item.quantity.trim() || item.name.trim()).length || !cleanSteps.length || cleanSteps.length !== steps.filter(step => step.trim()).length)) {
      setMessage("For publishing, add a cover photo, description, valid times and servings, and complete ingredients and steps.");
      setIsPublishing(false);
      return;
    }

    try {
      let uploadedVideoUrl = videoUrl;
      if (videoFile) {
        setMessage("Uploading your cooking video...");
        uploadedVideoUrl = await uploadCookingVideo(videoFile);
      }
      setMessage(status === "draft" ? "Saving your draft..." : "Publishing your recipe...");
      const payload = {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
        preparationTime: Number(values.prep) || 0,
        cookingTime: Number(values.cook) || 0,
        servings: Number(values.servings) || 1,
        image,
        videoUrl: uploadedVideoUrl,
        ingredients: cleanIngredients,
        steps: cleanSteps,
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean).slice(0, 20),
        status
      };
      delete payload.prep;
      delete payload.cook;
      const result = await api(recipeId ? `/recipes/${recipeId}` : "/recipes", { method: recipeId ? "PUT" : "POST", body: payload, auth: true });
      window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: status === "draft" ? "Draft saved" : "Recipe published" }));
      navigate(status === "draft" ? "/my-recipes" : `/recipe/${result.recipe._id}`);
    } catch (error) {
      setMessage(error.message || "Could not publish this recipe.");
    } finally {
      setIsPublishing(false);
    }
  };

  const chooseImage = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Choose an image file to upload.");
      return;
    }
    try {
      setMessage("");
      setImage(await compressImage(file));
    } catch (error) {
      setMessage(error.message || "Could not process that image.");
    }
  };

  const chooseVideo = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!VIDEO_TYPES.includes(file.type)) {
      setVideoFile(null);
      setMessage("Choose an MP4, WebM, or MOV video.");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setVideoFile(null);
      setMessage("Cooking videos must be 100 MB or smaller.");
      return;
    }
    setMessage("");
    setVideoFile(file);
  };

  if (isLoading) return <section className="page-section empty-state"><h1>Loading recipe...</h1></section>;

  return (
    <section className="page-section form-page">
      <Link to={recipeId ? "/my-recipes" : "/recipes"} className="back-link">← Cancel</Link>
      <div className="page-title">
        <span className="eyebrow">{recipeId ? "EDIT" : "CREATE"}</span>
        <h1>{recipeId ? "Edit Recipe" : "Create Recipe"}</h1>
        <p>Share the dish, ingredients, and the way you make it.</p>
      </div>
      <form className="recipe-form" onSubmit={submit}>
        <div className="upload-box">
          {image ? <img className="recipe-image-preview" src={image} alt="Recipe image preview" /> : "📸"}
          <h3>Food photo</h3>
          <p>Choose a photo of your finished dish. A cover image is required to publish.</p>
          <label className="image-upload-control">Choose image
            <input aria-label="Upload recipe image" type="file" accept="image/*" onChange={chooseImage} />
          </label>
        </div>
        <div className="upload-box video-upload-box">
          <h3>Cooking video</h3>
          <p>{videoFile?.name || (videoUrl ? "Cooking video attached" : "Upload your own cooking video, or add a YouTube link below.")}</p>
          <label className="image-upload-control">Choose video
            <input aria-label="Upload cooking video" type="file" accept="video/mp4,video/webm,video/quicktime" onChange={chooseVideo} />
          </label>
          <small>MP4, WebM, or MOV · up to 100 MB</small>
        </div>
        <div className="form-grid">
          <label>Recipe name<input value={values.title} onChange={event => updateValue("title", event.target.value)} maxLength={140} placeholder="e.g. Creamy Garlic Pasta" /></label>
          <label>Category<select value={values.category} onChange={event => updateValue("category", event.target.value)}>{["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Healthy", "Other"].map(category => <option key={category}>{category}</option>)}</select></label>
          <label>Food type<select value={values.type} onChange={event => updateValue("type", event.target.value)}><option>Veg</option><option>Non-Veg</option></select></label>
          <label>Cuisine<input value={values.cuisine} onChange={event => updateValue("cuisine", event.target.value)} placeholder="e.g. South Indian" /></label>
          <label>Preparation time (min)<input value={values.prep} onChange={event => updateValue("prep", event.target.value)} type="number" min="0" /></label>
          <label>Cooking time (min)<input value={values.cook} onChange={event => updateValue("cook", event.target.value)} type="number" min="0" /></label>
          <label>Total time (min)<input value={(Number(values.prep) || 0) + (Number(values.cook) || 0)} readOnly /></label>
          <label>Servings<input value={values.servings} onChange={event => updateValue("servings", event.target.value)} type="number" min="1" /></label>
          <label>Difficulty<select value={values.difficulty} onChange={event => updateValue("difficulty", event.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
        </div>
        <label>Short description<textarea value={values.description} onChange={event => updateValue("description", event.target.value)} maxLength={3000} placeholder="What makes this recipe special?" /></label>
        <div className="dynamic-list">
          <div className="dynamic-list-heading"><h2>Ingredients</h2><button className="btn secondary" type="button" disabled={ingredients.length >= 50} onClick={() => setIngredients(current => [...current, { quantity: "", name: "" }])}><Plus size={16} /> Add ingredient</button></div>
          {ingredients.map((ingredient, index) => <div className="dynamic-row ingredient-row" key={`ingredient-${index}`}>
            <label>Quantity<input value={ingredient.quantity} onChange={event => setIngredients(current => current.map((item, row) => row === index ? { ...item, quantity: event.target.value } : item))} placeholder="e.g. 2 tbsp" /></label>
            <label>Ingredient<input value={ingredient.name} onChange={event => setIngredients(current => current.map((item, row) => row === index ? { ...item, name: event.target.value } : item))} placeholder="e.g. Olive oil" /></label>
            <button className="icon-btn remove-row" type="button" aria-label={`Remove ingredient ${index + 1}`} onClick={() => setIngredients(current => current.filter((_, row) => row !== index))}><Trash2 size={17} /></button>
          </div>)}
        </div>
        <div className="dynamic-list">
          <div className="dynamic-list-heading"><h2>Cooking instructions</h2><button className="btn secondary" type="button" disabled={steps.length >= 50} onClick={() => setSteps(current => [...current, ""])}><Plus size={16} /> Add step</button></div>
          {steps.map((step, index) => <div className="dynamic-row step-row" key={`step-${index}`}>
            <label>Step {index + 1}<textarea value={step} onChange={event => setSteps(current => current.map((item, row) => row === index ? event.target.value : item))} placeholder="Describe what to do" /></label>
            <button className="icon-btn remove-row" type="button" aria-label={`Remove step ${index + 1}`} onClick={() => setSteps(current => current.filter((_, row) => row !== index))}><Trash2 size={17} /></button>
          </div>)}
        </div>
        <label>YouTube recipe video URL (optional)<input value={values.youtubeUrl} onChange={event => updateValue("youtubeUrl", event.target.value)} type="url" placeholder="https://youtube.com/watch?v=..." /></label>
        <label>Tags (optional)<input value={tags} onChange={event => setTags(event.target.value)} placeholder="Quick, family favorite, spicy" /></label>
        <label>Author<input value={user?.name || ""} readOnly /></label>
        {message && <p className="form-message" role="status">{message}</p>}
        <div className="form-actions">
          <Link className="btn secondary" to={recipeId ? "/my-recipes" : "/recipes"}>Cancel</Link>
          <button className="btn secondary" type="submit" value="draft" disabled={isPublishing}>{isPublishing ? "Saving..." : "Save as Draft"}</button>
          <button className="btn primary" type="submit" value="published" disabled={isPublishing}>{isPublishing ? "Saving..." : recipeId ? "Publish Changes" : "Publish Recipe"}</button>
        </div>
      </form>
    </section>
  );
}