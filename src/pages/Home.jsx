import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, ChefHat, Clock, Sparkles } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";

const categories = [
  ["🥞", "Breakfast", "22 Recipes"],
  ["🥪", "Lunch", "26 Recipes"],
  ["🥘", "Dinner", "39 Recipes"],
  ["🥨", "Snacks", "18 Recipes"],
  ["🍰", "Desserts", "31 Recipes"],
  ["🥤", "Drinks", "14 Recipes"],
  ["🍛", "Indian", "42 Recipes"],
  ["🥡", "Chinese", "20 Recipes"],
  ["🍕", "Italian", "28 Recipes"]
];

export default function Home() {
  const [query,setQuery]=useState("");const navigate=useNavigate();
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={16}/> COMMUNITY COOKING</span>
          <h1>Discover. Cook.<br/><span>Share.</span></h1>
          <p>Find delicious recipes, share your creations, and connect with food lovers around the world.</p>
          <div className="hero-search">
            <Search size={21}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&navigate(`/recipes?q=${encodeURIComponent(query)}`)} placeholder="Search recipes, ingredients, cuisines..." />
            <Link to={`/recipes?q=${encodeURIComponent(query)}`}>Search</Link>
          </div>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn primary">Explore Recipes <ArrowRight size={18}/></Link>
            <Link to="/add-recipe" className="btn secondary">Share Your Recipe</Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-circle"></div>
          <img src={recipes[0].image} alt="Featured food"/>
          <div className="floating-card"><ChefHat size={20}/><div><b>1,200+</b><small>Recipes shared</small></div></div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">POPULAR NOW</span><h2>🔥 Trending Recipes</h2></div>
          <Link to="/recipes">View all <ArrowRight size={17}/></Link>
        </div>
        <div className="recipe-grid">{recipes.slice(0, 4).map(r => <RecipeCard key={r.id} recipe={r}/>)}</div>
      </section>

      <section className="section soft-section">
        <div className="section-heading">
          <div><span className="eyebrow">EXPLORE</span><h2>Popular Categories</h2></div>
          <Link to="/categories">All categories <ArrowRight size={17}/></Link>
        </div>
        <div className="category-grid">
          {categories.map(([icon, name, count]) => (
            <Link className="category-card" to="/recipes" key={name}>
              <span className="cat-icon">{icon}</span><div><h3>{name}</h3><p>{count}</p></div><ArrowRight size={18}/>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="featured">
          <div className="featured-image"><img src={recipes[4].image} alt={recipes[4].title}/></div>
          <div className="featured-content">
            <span className="eyebrow">⭐ FEATURED RECIPE</span>
            <h2>{recipes[4].title}</h2>
            <p>{recipes[4].description}</p>
            <div className="feature-stats"><span><Clock size={18}/> {recipes[4].time} min</span><span>⭐ {recipes[4].rating}</span><span>👨‍🍳 {recipes[4].author}</span></div>
            <Link className="btn primary" to={`/recipe/${recipes[4].id}`}>View Recipe <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div><span className="eyebrow">JUST ADDED</span><h2>🆕 Latest Recipes</h2></div>
          <Link to="/recipes">View all <ArrowRight size={17}/></Link>
        </div>
        <div className="recipe-grid">{recipes.slice(-4).reverse().map(r => <RecipeCard key={r.id} recipe={r}/>)}</div>
      </section>
    </>
  );
}
