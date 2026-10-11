import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">🍳 RecipeBox</div>
        <p>Discover, cook and share recipes with food lovers.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <p>Trending Recipes</p>
        <p>Healthy Recipes</p>
        <p>Quick 30-Minute Recipes</p>
      </div>
      <div>
        <h4>Community</h4>
        <p>Top Creators</p>
        <p>Share Your Recipe</p>
        <p>Creator Dashboard</p>
      </div>
      <div className="copyright">© 2026 RecipeBox. College Project.</div>
    </footer>
  );
}