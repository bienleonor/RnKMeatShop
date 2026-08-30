import { Router } from "express";
import { currentUser, login, logout, register } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Invalid login details" });
  }

  req.body = result.data;
  return login(req, res, next);
});

router.post("/register", (req, res, next) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Enter a valid name, username, email, and password" });
  }

  req.body = result.data;
  return register(req, res, next);
});

router.post("/logout", logout);
router.get("/me", requireAuth, currentUser);

export default router;