import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const tokenFor = id => jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const userData = user => ({ id: user.id, name: user.name, email: user.email, bio: user.bio, avatar: user.avatar });
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || "") || typeof password !== "string" || password.length < 8) return res.status(400).json({ message: "Enter your name, a valid email, and a password with at least 8 characters." });
  if (await User.exists({ email: email.toLowerCase().trim() })) return res.status(409).json({ message: "An account with this email already exists." });
  const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password: await bcrypt.hash(password, 12) });
  res.status(201).json({ token: tokenFor(user.id), user: userData(user) });
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Enter your email and password." });
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Email or password is incorrect." });
  res.json({ token: tokenFor(user.id), user: userData(user) });
});
export const me = asyncHandler(async (req, res) => res.json({ user: userData(req.user) }));
export const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  if (!/^\S+@\S+\.\S+$/.test(email || "")) return res.status(400).json({ message: "Enter a valid email address." });
  const user = await User.findOne({ email });
  const response = { message: "If an account exists for that email, reset instructions have been sent." };
  if (user) {
    const raw = crypto.randomBytes(32).toString("hex"); user.resetTokenHash = crypto.createHash("sha256").update(raw).digest("hex"); user.resetTokenExpires = Date.now() + 30 * 60 * 1000; await user.save();
    // Email delivery is intentionally not faked. Configure a mail provider before exposing reset URLs.
    if (process.env.NODE_ENV !== "production" && process.env.DEV_SHOW_RESET_TOKEN === "true") response.resetToken = raw;
  }
  res.json(response);
});
export const resetPassword = asyncHandler(async (req, res) => {
  const hash = crypto.createHash("sha256").update(req.body.token || "").digest("hex");
  if (typeof req.body.password !== "string" || req.body.password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters." });
  const user = await User.findOne({ resetTokenHash: hash, resetTokenExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: "Reset link is invalid or expired." });
  user.password = await bcrypt.hash(req.body.password, 12); user.resetTokenHash = undefined; user.resetTokenExpires = undefined; await user.save(); res.json({ message: "Password updated. You can now log in." });
});
