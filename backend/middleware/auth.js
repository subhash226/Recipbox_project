import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.slice(7);
    if (!token) return res.status(401).json({ message: "Please log in to continue." });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.sub);
    if (!req.user) return res.status(401).json({ message: "Account no longer exists." });
    next();
  } catch { res.status(401).json({ message: "Session expired. Please log in again." }); }
}
