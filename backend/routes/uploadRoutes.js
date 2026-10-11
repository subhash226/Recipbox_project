import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/signature", protect, (req, res) => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(503).json({ message: "Video uploads are not configured. Add Cloudinary credentials to the backend environment." });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "recipebox/cooking-videos";
  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, CLOUDINARY_API_SECRET);
  res.json({ cloudName: CLOUDINARY_CLOUD_NAME, apiKey: CLOUDINARY_API_KEY, folder, timestamp, signature });
});

export default router;