import React from "react";
import { Link } from "react-router-dom";
const cats = [
  ["🥞","Breakfast","22 Recipes"],["🥪","Lunch","26 Recipes"],["🥘","Dinner","39 Recipes"],
  ["🥨","Snacks","18 Recipes"],["🍰","Desserts","31 Recipes"],["🥤","Drinks","14 Recipes"],
  ["🍛","Indian","42 Recipes"],["🥡","Chinese","20 Recipes"],["🍕","Italian","28 Recipes"]
];
export default function Categories() {
  return <section className="page-section"><div className="page-title"><span className="eyebrow">BROWSE</span><h1>Recipe Categories</h1><p>Explore recipes by cuisine, meal and food style.</p></div><div className="category-grid big">{cats.map(c=><Link className="category-card" to="/recipes" key={c[1]}><span className="cat-icon">{c[0]}</span><div><h3>{c[1]}</h3><p>{c[2]}</p></div><span>→</span></Link>)}</div></section>;
}