import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";
import { api } from "../services/api";

export default function Recipes() {
  const [params] = useSearchParams(); const [query, setQuery] = useState(params.get("q") || ""); const [category, setCategory] = useState(""); const [type, setType] = useState(""); const [difficulty, setDifficulty] = useState(""); const [limit, setLimit] = useState(""); const [rating, setRating] = useState(""); const [sort, setSort] = useState("Latest"); const [communityRecipes, setCommunityRecipes] = useState([]);
  useEffect(() => {
    let active = true;
    api("/recipes").then(({ recipes: rows = [] }) => {
      if (!active) return;
      setCommunityRecipes(rows.map(recipe => ({
        ...recipe,
        id: recipe._id,
        author: recipe.author?.name || "Community cook",
        ingredients: (recipe.ingredients || []).map(ingredient => typeof ingredient === "string" ? ingredient : [ingredient.quantity, ingredient.name].filter(Boolean).join(" ")),
        time: (Number(recipe.preparationTime) || 0) + (Number(recipe.cookingTime) || 0),
        rating: recipe.ratings?.length ? recipe.ratings.reduce((sum, item) => sum + item.value, 0) / recipe.ratings.length : 0,
        ratingsCount: recipe.ratings?.length || 0
      })));
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => {
    let created=[];try{created=JSON.parse(localStorage.getItem("recipebox-created")||"[]")}catch{};
    let rows = [...created, ...communityRecipes, ...recipes].filter(r => {
      const term = query.toLowerCase();
      return (!term || [r.title, r.description, r.category, r.cuisine, r.author, ...(r.ingredients || []), ...(r.tags || [])].join(" ").toLowerCase().includes(term)) && (!category || r.category.toLowerCase() === category.toLowerCase() || r.cuisine?.toLowerCase() === category.toLowerCase()) && (!type || r.type === type) && (!difficulty || r.difficulty === difficulty) && (!limit || r.time <= Number(limit)) && (!rating || r.rating >= Number(rating));
    });
    if (sort === "Highest Rated") rows.sort((a,b) => b.rating-a.rating); if (sort === "Quickest") rows.sort((a,b) => a.time-b.time); if (sort === "Most Popular") rows.sort((a,b) => b.ratingsCount-a.ratingsCount); return rows;
  }, [query, category, type, difficulty, limit, rating, sort, communityRecipes]);
  const clear = () => {setQuery("");setCategory("");setType("");setDifficulty("");setLimit("");setRating("");setSort("Latest");};
  const categories = [...new Set([...recipes, ...communityRecipes].map(recipe => recipe.category).filter(Boolean))];
  return (
    <section className="page-section">
      <div className="page-title"><span className="eyebrow">THE COMMUNITY TABLE</span><h1>Explore Recipes</h1><p>Find your next favorite, one delicious recipe at a time.</p></div>
      <div className="filters">
        <label className="search-input"><Search size={18}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search recipes, ingredients, cuisine..."/></label>
        <select value={category} onChange={event => setCategory(event.target.value)}><option value="">All categories</option>{categories.map(item => <option key={item}>{item}</option>)}</select>
        <select value={type} onChange={event => setType(event.target.value)}><option value="">Veg & Non-Veg</option><option>Veg</option><option>Non-Veg</option></select>
        <select value={difficulty} onChange={event => setDifficulty(event.target.value)}><option value="">Any difficulty</option>{["Easy","Medium","Hard"].map(item => <option key={item}>{item}</option>)}</select>
        <select value={limit} onChange={event => setLimit(event.target.value)}><option value="">Any cook time</option><option value="20">Under 20 min</option><option value="30">Under 30 min</option><option value="45">Under 45 min</option></select>
        <select value={rating} onChange={event => setRating(event.target.value)}><option value="">Any rating</option><option value="4.5">4.5+ stars</option><option value="4.8">4.8+ stars</option></select>
        <select value={sort} onChange={event => setSort(event.target.value)}><option>Latest</option><option>Most Popular</option><option>Highest Rated</option><option>Quickest</option></select>
        <button className="filter-btn" onClick={clear}><X size={16}/> Clear filters</button>
      </div>
      <p className="result-line"><SlidersHorizontal size={14}/> Showing {filtered.length} delicious recipes</p>
      {filtered.length ? <div className="recipe-grid">{filtered.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}</div> : <div className="empty-state"><span>🍽️</span><h2>No recipes found.</h2><p>Try changing your search or filters.</p><button className="btn secondary" onClick={clear}>Clear filters</button></div>}
    </section>
  );
}
