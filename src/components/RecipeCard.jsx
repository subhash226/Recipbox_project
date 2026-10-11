import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, Star, Share2 } from "lucide-react";

export default function RecipeCard({ recipe }) {
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("recipebox-favorites") || "[]").includes(recipe.id));
  const unavailablePublicly = ["draft", "unpublished"].includes(recipe.status);
  const toggleFavorite = () => {
    const ids = JSON.parse(localStorage.getItem("recipebox-favorites") || "[]");
    const next = ids.includes(recipe.id) ? ids.filter(id => id !== recipe.id) : [...ids, recipe.id];
    localStorage.setItem("recipebox-favorites", JSON.stringify(next)); setSaved(!saved);
  };
  const share = async () => { const url = `${location.origin}/recipe/${recipe.id}`; try { await navigator.clipboard.writeText(url); window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: "Recipe link copied" })); } catch { window.prompt("Copy recipe link", url); } };
  return <article className="recipe-card"><div className="card-image"><img src={recipe.image} alt={recipe.title}/><button className={`heart ${saved ? "is-saved" : ""}`} aria-label={saved ? "Remove from favorites" : "Add to favorites"} onClick={toggleFavorite}><Heart size={19} fill={saved ? "currentColor" : "none"}/></button><span className="type-badge">{recipe.type}</span></div><div className="card-body"><span className="category">{recipe.category}</span><h3>{recipe.title}</h3><p>{recipe.description}</p><div className="card-meta"><span><Clock size={15}/> {recipe.time} min</span><span><Star size={15} fill="currentColor"/> {recipe.rating} <small>({recipe.ratingsCount || 0})</small></span></div><div className="card-bottom"><span>By {recipe.author}</span><span className="card-links"><button className="card-share" onClick={share} aria-label="Share recipe"><Share2 size={15}/></button><Link to={unavailablePublicly ? `/edit-recipe/${recipe.id}` : `/recipe/${recipe.id}`} className="view-link">{unavailablePublicly ? "Edit Recipe" : "View Recipe"} →</Link></span></div></div></article>;
}
