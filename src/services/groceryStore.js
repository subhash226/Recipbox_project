import { groceryProducts } from "../data/groceryProducts";
import { recipes } from "../data/recipes";
import { api } from "./api";

export const CART_KEY = "recipebox_cart";
export const ORDERS_KEY = "recipebox_orders";
export const WISHLIST_KEY = "recipebox_wishlist";
export const RECENT_RECIPES_KEY = "recipebox_recent_recipes";

function readStored(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function emitCartUpdate(cart) {
  window.dispatchEvent(new CustomEvent("recipebox-cart-updated", { detail: cart }));
}

export const formatINR = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value || 0);
export const slugify = value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const getProducts = () => groceryProducts;
export const getProductById = productId => groceryProducts.find(product => product.id === productId) || null;
export const getCart = () => readStored(CART_KEY, []).filter(line => getProductById(line.productId) && Number(line.quantity) > 0);
export const getWishlist = () => readStored(WISHLIST_KEY, []);
export const getOrders = () => readStored(ORDERS_KEY, []);

export function persistCart(cart) {
  writeStored(CART_KEY, cart);
  emitCartUpdate(cart);
  return cart;
}

export function addToCart(productId, quantity = 1) {
  if (!getProductById(productId)) return getCart();
  const amount = Math.max(1, Math.floor(Number(quantity) || 1));
  const cart = getCart();
  const existing = cart.find(line => line.productId === productId);
  return persistCart(existing
    ? cart.map(line => line.productId === productId ? { ...line, quantity: Math.min(99, line.quantity + amount) } : line)
    : [...cart, { productId, quantity: Math.min(99, amount) }]);
}

export function addManyToCart(lines) {
  let cart = getCart();
  for (const line of lines) {
    const productId = line.productId || line.product?.id;
    if (!getProductById(productId)) continue;
    const amount = Math.max(1, Math.floor(Number(line.quantity) || 1));
    const existing = cart.find(entry => entry.productId === productId);
    cart = existing
      ? cart.map(entry => entry.productId === productId ? { ...entry, quantity: Math.min(99, entry.quantity + amount) } : entry)
      : [...cart, { productId, quantity: Math.min(99, amount) }];
  }
  return persistCart(cart);
}

export function setCartQuantity(productId, quantity) {
  const amount = Math.floor(Number(quantity));
  if (amount <= 0) return removeFromCart(productId);
  return persistCart(getCart().map(line => line.productId === productId ? { ...line, quantity: Math.min(99, amount) } : line));
}

export function removeFromCart(productId) {
  return persistCart(getCart().filter(line => line.productId !== productId));
}

export function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const next = wishlist.includes(productId) ? wishlist.filter(id => id !== productId) : [...wishlist, productId];
  writeStored(WISHLIST_KEY, next);
  return next;
}

export function getOrderTotals(cart = getCart()) {
  const subtotal = cart.reduce((sum, line) => {
    const product = getProductById(line.productId);
    return sum + (product?.originalPrice || product?.price || 0) * line.quantity;
  }, 0);
  const discount = cart.reduce((sum, line) => {
    const product = getProductById(line.productId);
    return sum + Math.max(0, (product?.originalPrice || product?.price || 0) - (product?.price || 0)) * line.quantity;
  }, 0);
  const discountedSubtotal = subtotal - discount;
  const deliveryFee = discountedSubtotal === 0 || discountedSubtotal >= 499 ? 0 : 40;
  return { subtotal, discount, deliveryFee, total: discountedSubtotal + deliveryFee };
}

export function createOrder({ customer, paymentMethod }) {
  const cart = getCart();
  if (!cart.length) throw new Error("Your cart is empty.");
  const existingOrders = getOrders();
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const sequence = existingOrders.filter(order => order.id.startsWith(`RB-${day}-`)).length + 1;
  const id = `RB-${day}-${String(sequence).padStart(3, "0")}`;
  const items = cart.map(line => {
    const product = getProductById(line.productId);
    return { productId: product.id, name: product.name, sku: product.id, unit: product.unit, price: product.price, originalPrice: product.originalPrice || product.price, quantity: line.quantity, image: product.image };
  });
  const order = { id, createdAt: new Date().toISOString(), customer, paymentMethod, items, ...getOrderTotals(cart), status: "Order Placed" };
  writeStored(ORDERS_KEY, [order, ...existingOrders]);
  persistCart([]);
  return order;
}

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function splitIngredient(ingredient) {
  if (ingredient && typeof ingredient === "object") return { name: ingredient.name || "", quantity: ingredient.quantity || "As needed" };
  const text = String(ingredient || "").trim();
  const match = text.match(/^(\d+(?:[./]\d+)?(?:\s*(?:kg|g|ml|l|tbsp|tsp|cups?|cloves?|pieces?|pcs|oz|lb))?)\s+(.+)$/i);
  return match ? { quantity: match[1], name: match[2] } : { quantity: "As needed", name: text };
}

function matchProduct(ingredientName) {
  const normalized = normalizeText(ingredientName);
  return groceryProducts.find(product => product.aliases.some(alias => {
    const normalizedAlias = normalizeText(alias);
    return normalized === normalizedAlias || normalized.includes(normalizedAlias);
  })) || null;
}

export async function getRecipeIngredients(recipeSlug, recipeId) {
  let recipe = recipes.find(item => slugify(item.title) === recipeSlug || String(item.id) === recipeId);
  const recent = readStored(RECENT_RECIPES_KEY, []).find(item => item.slug === recipeSlug || item.id === recipeId);
  if (!recipe && recent) recipe = recent;
  const remoteId = recipe?._id || (recipe?.id && /^[a-f\d]{24}$/i.test(String(recipe.id)) ? recipe.id : null);
  if ((!recipe || !recipe.ingredients?.length) && remoteId) {
    try {
      const response = await api(`/recipes/${remoteId}`);
      recipe = response.recipe;
    } catch {
      recipe = null;
    }
  }
  if (!recipe) return { recipe: null, matched: [], unmatched: [] };
  const matched = [];
  const unmatched = [];
  (recipe.ingredients || []).forEach(rawIngredient => {
    const ingredient = splitIngredient(rawIngredient);
    const product = matchProduct(ingredient.name);
    if (product) matched.push({ ...ingredient, product });
    else if (ingredient.name) unmatched.push(ingredient);
  });
  return { recipe, matched, unmatched };
}

export function saveRecentRecipe(recipe) {
  const recent = readStored(RECENT_RECIPES_KEY, []).filter(item => item.id !== String(recipe._id || recipe.id));
  const entry = { id: String(recipe._id || recipe.id), slug: slugify(recipe.title), title: recipe.title, image: recipe.image || "", ingredients: recipe.ingredients || [], category: recipe.category || "" };
  const next = [entry, ...recent].slice(0, 8);
  writeStored(RECENT_RECIPES_KEY, next);
  return next;
}
