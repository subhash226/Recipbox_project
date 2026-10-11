import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowDownWideNarrow, ArrowRight, Search, ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { groceryCategories, groceryProducts } from "../data/groceryProducts";
import { recipes } from "../data/recipes";
import { useAuth } from "../context/AuthContext";
import { useGroceryCart } from "../context/GroceryCartContext";
import { api } from "../services/api";
import GroceryProductCard from "../components/GroceryProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import CartDrawer from "../components/CartDrawer";
import PersonalIngredientsList from "../components/PersonalIngredientsList";
import { addManyToCart, addToCart, RECENT_RECIPES_KEY, getProductById, getProducts, getRecipeIngredients, getWishlist, slugify, toggleWishlist } from "../services/groceryStore";

function readStored(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

const categoryEmoji = { Breakfast: "🍳", Lunch: "🥗", Dinner: "🍲", Dessert: "🍰", Desserts: "🍰", Snacks: "🥨", Drinks: "🥤", Healthy: "🥬", Indian: "🍛" };

function getRecipeSuggestions(savedRecipes) {
  const recent = readStored(RECENT_RECIPES_KEY, []);
  const favoriteIds = readStored("recipebox-favorites", []).map(String);
  const favorites = recipes.filter(recipe => favoriteIds.includes(String(recipe.id))).map(recipe => ({ ...recipe, id: String(recipe.id), slug: slugify(recipe.title) }));
  const suggestions = [...recent, ...savedRecipes, ...favorites].filter((recipe, index, all) => all.findIndex(item => String(item.id) === String(recipe.id)) === index);
  return suggestions.length ? suggestions.slice(0, 4) : recipes.slice(0, 4).map(recipe => ({ ...recipe, id: String(recipe.id), slug: slugify(recipe.title) }));
}

function RecipeSuggestion({ recipe, onShop }) {
  const count = recipe.ingredients?.length || 0;
  return <article className="recipe-shop-card">
    <div className="recipe-shop-art" aria-hidden="true">{categoryEmoji[recipe.category] || "🍽️"}</div>
    <div className="recipe-shop-copy"><span>{recipe.category || "Recipe"}</span><h3>{recipe.title}</h3><p>{count} ingredients to shop</p></div>
    <button type="button" className="recipe-shop-action" onClick={onShop}>Shop Ingredients <ArrowRight size={15}/></button>
  </article>;
}

function RecipeIngredientMatcher({ recipeKey, recipeId, onCartChanged, onProductDetails }) {
  const [result, setResult] = useState({ recipe: null, matched: [], unmatched: [] });
  const [loading, setLoading] = useState(true);
  const { cart, setQuantity } = useGroceryCart();
  const quantities = useMemo(() => Object.fromEntries(cart.map(line => [line.productId, line.quantity])), [cart]);
  const [wishlist, setWishlist] = useState(getWishlist);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getRecipeIngredients(recipeKey, recipeId).then(value => { if (active) setResult(value); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [recipeKey, recipeId]);

  const addAll = () => {
    const cart = addManyToCart(result.matched.map(item => ({ productId: item.product.id, quantity: 1 })));
    onCartChanged("Recipe ingredients added to cart");
    return cart;
  };

  return (
    <section className="recipe-match-section" id="recipe-ingredients">
      <div className="recipe-match-heading">
        <div><span className="eyebrow">COOK THIS AT HOME</span><h2>{loading ? "Finding ingredients..." : result.recipe ? `Ingredients for ${result.recipe.title}` : "Recipe ingredients"}</h2><p>Matched ingredients, quantities, and prices from the RecipeBox store.</p></div>
        <button type="button" className="btn primary" disabled={loading || !result.matched.length} onClick={addAll}>Add All Ingredients to Cart <ShoppingCart size={16}/></button>
      </div>
      {loading ? <div className="store-loading"><span/>Matching your recipe ingredients...</div> : !result.recipe ? <div className="store-empty"><h3>Recipe not found</h3><p>Open a recipe and use its Shop Ingredients button to create this list.</p></div> : (
        <>
          <div className="matched-ingredient-grid">{result.matched.map((item, index) => {
            const product = getProductById(item.product.id);
            return <GroceryProductCard key={`${product.id}-${index}`} product={product} requiredQuantity={item.quantity} onAdd={() => { addToCart(product.id); onCartChanged(`${product.name} added to cart`); }} onQuantity={quantity => setQuantity(product.id, quantity)} quantity={quantities[product.id] || 0} wishlisted={wishlist.includes(product.id)} onWishlist={() => setWishlist(toggleWishlist(product.id))} onDetails={() => onProductDetails(product)} />;
          })}</div>
          {result.unmatched.length > 0 && <p className="unmatched-note">Not in the store yet: {result.unmatched.map(item => item.name).join(", ")}</p>}
          {result.matched.length === 0 && <div className="store-empty"><h3>No matching store products yet</h3><p>We couldn't match this recipe's ingredients to available products.</p></div>}
          <button type="button" className="text-button" onClick={() => document.getElementById("store-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Continue browsing all products</button>
        </>
      )}
    </section>
  );
}

export default function GroceryStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { cart, count, setQuantity } = useGroceryCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [wishlist, setWishlist] = useState(getWishlist);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const recipeKey = searchParams.get("recipe") || "";
  const recipeId = searchParams.get("id") || "";
  useEffect(() => {
    if (searchParams.get("cart") !== "open") return;
    setCartOpen(true);
    const next = new URLSearchParams(searchParams);
    next.delete("cart");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);
  useEffect(() => {
    if (!user || !localStorage.getItem("recipebox-token")) {
      setSavedRecipes([]);
      return;
    }
    let active = true;
    api("/users/me/favorites", { auth: true }).then(({ recipes: saved = [] }) => {
      if (active) setSavedRecipes(saved.map(recipe => ({ ...recipe, id: String(recipe._id), slug: slugify(recipe.title) })));
    }).catch(() => {});
    return () => { active = false; };
  }, [user?.id]);
  const suggestions = useMemo(() => getRecipeSuggestions(savedRecipes), [savedRecipes]);
  const cartQuantities = useMemo(() => Object.fromEntries(cart.map(line => [line.productId, line.quantity])), [cart]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    let products = getProducts().filter(product => {
      const matchesSearch = !term || [product.name, product.category, product.id, ...product.aliases].some(value => value.toLowerCase().includes(term));
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
    if (sort === "Price: Low to High") products = [...products].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") products = [...products].sort((a, b) => b.price - a.price);
    if (sort === "Name: A-Z") products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Rating") products = [...products].sort((a, b) => b.rating - a.rating);
    return products;
  }, [search, category, sort]);

  const announce = message => {
    window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: message }));
  };

  const shopRecipe = recipe => {
    const slug = recipe.slug || slugify(recipe.title);
    setSearchParams({ recipe: slug, id: String(recipe.id || recipe._id || "") });
    window.setTimeout(() => document.getElementById("recipe-ingredients")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const changeQuantity = (productId, quantity) => {
    setQuantity(productId, quantity);
  };

  return (
    <section className="grocery-store-page">
      <header className="grocery-store-header">
        <div className="grocery-header-inner">
          <div><span className="eyebrow">RECIPEBOX MARKET</span><h1>RecipeBox Grocery Store</h1><p>Everything you need to cook your favourite recipes.</p></div>
          <button type="button" className="store-cart-button" onClick={() => setCartOpen(true)}><ShoppingCart size={20}/><span>Cart</span><b>{count}</b></button>
        </div>
      </header>
  <main className="grocery-store-content">
        <section className="recipe-suggestions-section">
          <div className="store-section-heading"><div><span className="eyebrow">COOK SOMETHING GOOD</span><h2>Shop Ingredients for Your Recipes</h2></div><Link to="/recipes">Explore recipes <ArrowRight size={15}/></Link></div>
          <div className="recipe-shop-grid">{suggestions.map(recipe => <RecipeSuggestion key={recipe.id} recipe={recipe} onShop={() => shopRecipe(recipe)}/>)}</div>
        </section>

        {recipeKey && <RecipeIngredientMatcher key={`${recipeKey}-${recipeId}`} recipeKey={recipeKey} recipeId={recipeId} onCartChanged={announce} onProductDetails={setSelectedProduct}/>}

  <section className="store-catalog-section" id="store-catalog">
          <div className="store-section-heading catalog-title"><div><span className="eyebrow">FRESH PICKS · {groceryProducts.length} PRODUCTS</span><h2>Shop groceries</h2></div><button type="button" className="store-cart-mobile" onClick={() => setCartOpen(true)}><ShoppingCart size={17}/> Cart ({count})</button></div>
          <div className="store-toolbar">
            <label className="store-search"><Search size={18}/><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search ingredients, groceries..." aria-label="Search ingredients and groceries"/><kbd>⌕</kbd></label>
            <label className="sort-control"><ArrowDownWideNarrow size={16}/><span>Sort by</span><select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products"><option>Recommended</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Name: A-Z</option><option>Rating</option></select></label>
          </div>
          <div className="grocery-category-filters" role="group" aria-label="Product categories">{groceryCategories.map(item => <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="catalog-result-row"><p><SlidersHorizontal size={14}/> {filteredProducts.length} products</p>{(search || category !== "All") && <button type="button" onClick={() => { setSearch(""); setCategory("All"); }}><X size={14}/> Clear filters</button>}</div>
          {filteredProducts.length ? <div className="grocery-product-grid">{filteredProducts.map(product => <GroceryProductCard key={product.id} product={product} quantity={cartQuantities[product.id] || 0} wishlisted={wishlist.includes(product.id)} onAdd={() => { addToCart(product.id); announce(`${product.name} added to cart`); }} onQuantity={quantity => changeQuantity(product.id, quantity)} onWishlist={() => { setWishlist(toggleWishlist(product.id)); announce(wishlist.includes(product.id) ? "Removed from wishlist" : "Added to wishlist"); }} onDetails={() => setSelectedProduct(product)}/>)}</div> : <div className="store-empty"><h3>No groceries match that search</h3><p>Try another ingredient, SKU, or category.</p><button className="btn secondary" type="button" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</button></div>}
        </section>

        {user && <PersonalIngredientsList/>}
      </main>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={(productId, quantity) => { addToCart(productId, quantity); announce(`${selectedProduct.name} added to cart`); }}/>}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
    </section>
  );
}
