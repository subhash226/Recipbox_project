# RecipeBox API

## Local setup

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, a random `JWT_SECRET` of at least 32 characters, and the local frontend origin.
3. Run `npm install` from this `backend` directory.
4. Run `npm run dev` (or `npm start` for production).
5. From the project root run `npm install` then `npm run dev` for the Vite frontend.

Direct cooking-video uploads require a Cloudinary account. Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in `backend/.env`; until these are set, the recipe photo and YouTube-link options remain available, while direct video upload reports that it is not configured. Videos are limited to 100 MB in the form.

The API listens at `http://localhost:5000`; the frontend defaults to this URL. Set `VITE_API_URL` if it differs.

## Routes

- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`.
- Recipes: `GET /api/recipes`, `GET /api/recipes/:id`, authenticated create/update/delete and like/favorite/rating/comments actions.
- Users: public profile, authenticated profile editing, follow/unfollow, favorites, own recipes, and shopping list.
- Notifications: `GET /api/notifications`. Reports: `POST /api/reports/:recipeId`.

Password recovery stores a hashed single-use reset token. Add a mail provider before production so users can receive reset links. During local development only, set `DEV_SHOW_RESET_TOKEN=true` to return the token from the forgot password API response. Cloudinary variables are reserved in `.env.example`; configure a signed upload endpoint before enabling file uploads.
