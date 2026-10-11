import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, PlusCircle, Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useGroceryCart } from "../context/GroceryCartContext";

export default function Navbar({ dark, setDark, onCartOpen }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, logout } = useAuth();
	const { count } = useGroceryCart();
	return <header className="navbar"><Link to="/" className="logo"><span>🍳</span> RecipeBox</Link>
		<nav className={menuOpen ? "nav-open" : ""} onClick={() => setMenuOpen(false)}>
			<Link to="/">Home</Link><Link to="/recipes">Recipes</Link><Link to="/categories">Categories</Link><Link to="/shopping-list">Shopping List</Link><Link to="/orders">My Orders</Link>
			{user && <><Link to="/my-recipes">My Recipes</Link><Link to="/favorites">Favorites</Link><Link to="/dashboard">Dashboard</Link><Link to="/profile">Profile</Link></>}
		</nav>
		<div className="nav-actions">
			<button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
			{user ? <><Link to="/add-recipe" className="share-mini"><PlusCircle size={17}/> Create Recipe</Link><button className="icon-btn logout-btn" onClick={logout}>Log out</button><Link to="/profile" className="profile-btn">{user.name?.[0] || "U"}</Link></> : <Link to="/login" className="share-mini">Login / Register</Link>}
			<button type="button" className="cart-nav-button" onClick={onCartOpen} aria-label={`Open cart with ${count} items`}><ShoppingCart size={19}/><span>Cart</span><b>{count}</b></button>
			<button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle dark mode" aria-label="Toggle dark mode">{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
		</div>
	</header>;
}
