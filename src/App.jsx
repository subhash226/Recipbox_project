import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import AddRecipe from "./pages/AddRecipePage";
import EditRecipe from "./pages/EditRecipe";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import ShoppingList from "./pages/ShoppingList";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import CartDrawer from "./components/CartDrawer";
import CreatorDashboard from "./pages/CreatorDashboard";
import { AuthProvider } from "./context/AuthContext";
import { GroceryCartProvider } from "./context/GroceryCartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("recipebox-theme") === "dark");
  const [toast, setToast] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => { localStorage.setItem("recipebox-theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { const show = e => { setToast(e.detail); window.setTimeout(() => setToast(""), 2600); }; window.addEventListener("recipebox-toast", show); return () => window.removeEventListener("recipebox-toast", show); }, []);

  return (
    <AuthProvider><GroceryCartProvider><div className={dark ? "app dark" : "app"}>
      <Navbar dark={dark} setDark={setDark} onCartOpen={() => setCartOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
          <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/dashboard" element={<ProtectedRoute><CreatorDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      {toast && <div className="toast" role="status">{toast}</div>}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div></GroceryCartProvider></AuthProvider>
  );
}
