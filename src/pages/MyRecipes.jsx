import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

function normalizeRecipe(recipe, authorName) {
	const ratings = recipe.ratings || [];
	return {
		...recipe,
		id: recipe._id,
		author: authorName || "You",
		time: (Number(recipe.preparationTime) || 0) + (Number(recipe.cookingTime) || 0),
		rating: ratings.length ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length : 0,
		ratingsCount: ratings.length
	};
}

export default function MyRecipes() {
	const { user } = useAuth();
	const [mine, setMine] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");

	const loadRecipes = async () => {
		setLoading(true);
		try {
			const { recipes = [] } = await api("/users/me/recipes", { auth: true });
			setMine(recipes.map(recipe => normalizeRecipe(recipe, user?.name)));
			setMessage("");
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { loadRecipes(); }, []);

	const changeStatus = async recipe => {
		const status = recipe.status === "published" ? "unpublished" : "published";
		try {
			const { recipe: updated } = await api(`/recipes/${recipe.id}`, { method: "PUT", body: { status }, auth: true });
			setMine(current => current.map(item => item.id === recipe.id ? normalizeRecipe(updated, user?.name) : item));
			window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: status === "published" ? "Recipe published" : "Recipe unpublished" }));
		} catch (error) {
			setMessage(error.message);
		}
	};

	const deleteRecipe = async recipe => {
		if (!window.confirm(`Delete “${recipe.title}”? This cannot be undone.`)) return;
		try {
			await api(`/recipes/${recipe.id}`, { method: "DELETE", auth: true });
			setMine(current => current.filter(item => item.id !== recipe.id));
			window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: "Recipe deleted" }));
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
		<section className="page-section">
			<div className="page-title">
				<span className="eyebrow">MY RECIPEBOX</span>
				<h1>My Recipes</h1>
				<p>Manage your drafts and published recipes.</p>
				<Link className="btn primary" to="/add-recipe"><Plus size={17} /> Create Recipe</Link>
			</div>
			{message && <p className="form-message" role="alert">{message}</p>}
			{loading ? <div className="empty-state"><h2>Loading your recipes...</h2></div> : mine.length ? (
				<div className="recipe-grid my-recipe-grid">
					{mine.map(recipe => <div className="my-recipe-item" key={recipe.id}>
						<div className="my-recipe-tools">
							<span className={`recipe-status status-${recipe.status}`}>{recipe.status}</span>
							<Link className="icon-btn" to={`/edit-recipe/${recipe.id}`} title="Edit recipe" aria-label={`Edit ${recipe.title}`}><Pencil size={17} /></Link>
							<button className="icon-btn" type="button" onClick={() => changeStatus(recipe)} title={recipe.status === "published" ? "Unpublish recipe" : "Publish recipe"} aria-label={recipe.status === "published" ? "Unpublish recipe" : "Publish recipe"}>
								{recipe.status === "published" ? <EyeOff size={17} /> : <Check size={17} />}
							</button>
							<button className="icon-btn delete-recipe" type="button" onClick={() => deleteRecipe(recipe)} title="Delete recipe" aria-label={`Delete ${recipe.title}`}><Trash2 size={17} /></button>
						</div>
						<RecipeCard recipe={recipe} />
					</div>)}
				</div>
			) : (
				<div className="empty-state"><span>🍲</span><h2>You haven't created any recipes yet.</h2><p>Share a favorite from your kitchen to get started.</p><Link className="btn primary" to="/add-recipe"><Plus size={17} /> Create your first recipe</Link></div>
			)}
		</section>
	);
}
