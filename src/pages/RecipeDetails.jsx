import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Bookmark, Share2, Clock, Users, BarChart3, Send, Star, ShoppingBasket, UserPlus } from "lucide-react";
import { recipes } from "../data/recipes";
import RecipeMediaPlayer from "../components/YouTubeRecipeVideo";
import { api } from "../services/api";
import { saveRecentRecipe } from "../services/groceryStore";

const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
export default function RecipeDetails() {
  const { id } = useParams(); const localRecipe = recipes.find(r => String(r.id) === id) || read("recipebox-created", []).find(r => String(r.id) === id);
  const [remoteRecipe, setRemoteRecipe] = useState(null); const [isLoading, setIsLoading] = useState(!localRecipe); const recipe = localRecipe || remoteRecipe;
  const YouTubeRecipeVideo = props => <RecipeMediaPlayer {...props} videoUrl={recipe?.videoUrl} />;
  const [checked, setChecked] = useState([]); const [saved, setSaved] = useState(false); const [likes, setLikes] = useState(0); const [comment, setComment] = useState(""); const [comments, setComments] = useState([]); const [rating, setRatingValue] = useState(0);
  useEffect(() => {
    if (localRecipe) return;
    let active = true;
    setRemoteRecipe(null);
    setIsLoading(true);
    api(`/recipes/${id}`).then(({ recipe: result }) => {
      if (!active) return;
      const ratings = result.ratings || [];
      setRemoteRecipe({
        ...result,
        author: result.author?.name || "Community cook",
        ingredients: (result.ingredients || []).map(ingredient => typeof ingredient === "string" ? ingredient : [ingredient.quantity, ingredient.name].filter(Boolean).join(" ")),
        rating: ratings.length ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length : 0,
        ratingsCount: ratings.length
      });
    }).catch(() => {}).finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [id]);
  useEffect(() => { if (recipe) saveRecentRecipe(recipe); }, [id, recipe?.title]);
  useEffect(() => {
    if (!recipe) return;
    const favs = read("recipebox-favorites", []);
    setSaved(favs.includes(recipe.id));
    setLikes(Array.isArray(recipe.likes) ? recipe.likes.length : read(`likes-${id}`, 0));
    setComments(Array.isArray(recipe.comments) ? recipe.comments.map(item => ({ ...item, id: item._id || item.id, author: item.author?.name || item.author || "Community cook" })) : read(`comments-${id}`, []));
    if (recipe._id && localStorage.getItem("recipebox-token")) {
      api("/users/me/favorites", { auth: true }).then(({ recipes: favorites = [] }) => setSaved(favorites.some(item => item._id === recipe._id))).catch(() => {});
    }
  }, [id, recipe]);
  if (!recipe) return <section className="page-section empty-state"><h1>{isLoading ? "Loading recipe..." : "Recipe not found"}</h1>{!isLoading && <Link className="btn primary" to="/recipes">Explore recipes</Link>}</section>;
  const toggleSaved = async () => {try{const d=await api(`/recipes/${id}/favorite`,{method:"POST",auth:true});setSaved(d.favorited)}catch(err){window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:err.message}))}};
  const toggleLike = async () => {try{const d=await api(`/recipes/${id}/like`,{method:"POST",auth:true});setLikes(d.likes)}catch(err){window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:err.message}))}};
  const addShopping = async () => {try{await api("/users/shopping-list",{method:"POST",body:{items:checked.map(text=>({text}))},auth:true});window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:"Ingredients added to shopping list"}));}catch(err){window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:err.message}))}};
  const postComment = async e => {e.preventDefault();if(!comment.trim())return;try{const d=await api(`/recipes/${id}/comments`,{method:"POST",body:{text:comment},auth:true});setComments(current=>[{...d.comment,id:d.comment._id,author:d.comment.author?.name||"You"},...current]);setComment("")}catch(err){window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:err.message}))}};
  const setRating = async value => {
    setRatingValue(value);
    if (!recipe._id) return;
    try {
      const result = await api(`/recipes/${id}/rating`, { method: "POST", body: { value }, auth: true });
      setRemoteRecipe(current => current?._id === recipe._id ? { ...current, rating: result.rating, ratingsCount: result.ratingsCount } : current);
    } catch (error) {
      window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: error.message }));
    }
  };
  const share = async () => {const url=location.href;try{await navigator.clipboard.writeText(url);window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:"Recipe link copied"}));}catch{window.prompt("Copy recipe link",url);}};
  return <section className="page-section details-page"><Link to="/recipes" className="back-link">← Back to recipes</Link><div className="details-hero"><img src={recipe.image} alt={recipe.title}/><div className="details-intro"><span className="category">{recipe.category} · {recipe.type}</span><h1>{recipe.title}</h1><p>{recipe.description}</p><div className="author-row"><div className="avatar">{recipe.author?.[0]||"R"}</div><div><b>{recipe.author}</b><small>Recipe Creator</small></div><span className="rating">⭐ {recipe.rating} ({recipe.ratingsCount||0} ratings)</span></div><div className="details-actions"><button onClick={toggleLike}><Heart size={19} fill={likes?"currentColor":"none"}/> {likes?"Liked":"Like"}</button><button onClick={toggleSaved}><Bookmark size={19} fill={saved?"currentColor":"none"}/> {saved?"Saved":"Favorite"}</button><button onClick={share}><Share2 size={19}/> Share</button><button onClick={()=>window.dispatchEvent(new CustomEvent("recipebox-toast",{detail:"Sign in to follow this creator"}))}><UserPlus size={18}/> Follow</button></div></div></div><div className="info-strip"><div><Clock/><span><small>Preparation</small><b>{recipe.preparationTime ?? Math.min(15,recipe.time)} min</b></span></div><div><Clock/><span><small>Cooking</small><b>{recipe.cookingTime ?? recipe.time} min</b></span></div><div><Users/><span><small>Servings</small><b>{recipe.servings || 4} people</b></span></div><div><BarChart3/><span><small>Difficulty</small><b>{recipe.difficulty}</b></span></div></div><div className="details-columns"><div><div className="content-card"><h2>🥕 Ingredients</h2><p className="muted">Choose the ingredients you need.</p>{recipe.ingredients.map((i,n)=><label className={`ingredient ${checked.includes(i)?"ingredient-checked":""}`} key={n}><input type="checkbox" checked={checked.includes(i)} onChange={()=>setChecked(checked.includes(i)?checked.filter(x=>x!==i):[...checked,i])}/><span>{i}</span></label>)}<button className="btn primary shopping-add" disabled={!checked.length} onClick={addShopping}><ShoppingBasket size={17}/> Add selected to Shopping List</button></div><div className="content-card"><h2>👨‍🍳 Cooking Instructions</h2>{recipe.steps.map((s,n)=><div className="step" key={n}><b>{String(n+1).padStart(2,"0")}</b><p>{s}</p></div>)}</div><YouTubeRecipeVideo youtubeUrl={recipe.youtubeUrl} title={recipe.title}/></div><aside className="comments content-card"><h2>💬 Community Reviews</h2><div className="rating-picker"><span>Your rating</span>{[1,2,3,4,5].map(n=><button aria-label={`${n} stars`} key={n} onClick={()=>setRating(n)}><Star size={19} fill={rating>=n?"#e96731":"none"} color={rating>=n?"#e96731":"#aaa"}/></button>)}</div>{rating>0&&<p className="muted">Thanks for rating this recipe {rating}/5!</p>}{comments.map(c=><div className="comment" key={c.id}><div className="avatar">{c.author[0]}</div><div><b>{c.author}</b><small className="comment-date">{c.date}</small><p>{c.text}</p></div></div>)}{!comments.length&&<p className="muted">Be the first to share what you thought.</p>}<form className="comment-box" onSubmit={postComment}><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a comment..."/><button aria-label="Post comment"><Send size={17}/></button></form></aside></div></section>;
}
