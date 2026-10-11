# RecipeBox – Recipe sharing frontend

RecipeBox is a responsive React and Vite frontend for a collaborative recipe community. It includes home and discovery pages, recipe details, search and filters, favorite recipes, recipe creation, a shopping list, profile pages, and a creator dashboard.

## Run the app

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Create a production build with `npm run build` and preview it with `npm run preview`.

## Features in this frontend

- Recipe cards link to recipe details; search covers title, cuisine, category, description, and ingredients.
- Details include interactive ingredient checklists, local ratings and comments, favorites, sharing, and a responsive YouTube embed.
- YouTube links accept `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/embed/`, and Shorts URLs. Invalid links show an error state without breaking details.
- Add Recipe stores published recipes in browser local storage. Shopping list items, favorites, comments, likes, and dark mode preference also persist locally.
- Mobile navigation and responsive card, detail, and video layouts.

## Current scope

This repository is frontend-only. It does not currently include Express, MongoDB models, JWT authentication, password reset, Cloudinary uploads, or server-side authorization. Account pages are presentation/demo flows; local storage is not secure authentication or shared multi-user persistence. To deploy the full brief, add a backend service and connect the UI through an API client, then configure MongoDB, JWT secrets, and Cloudinary credentials in the backend environment. Never put private credentials in Vite client variables.
