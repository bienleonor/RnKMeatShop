import { Router } from "express";
import {
  createLookup,
  deleteLookup,
  listLookups,
  updateLookup,
} from "../controllers/lookups.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { lookupIdSchema, lookupNameSchema } from "../validators/lookup.validator.js";

const router = Router();
const resources = new Set(["categories", "typesOfProducts"]);

function validateResource(req, res, next) {
  if (!resources.has(req.params.resource)) {
    return res.status(404).json({ error: "Lookup resource not found" });
  }
  return next();
}

function validateName(req, res, next) {
  const result = lookupNameSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Enter a valid non-empty name" });
  }
  req.body = result.data;
  return next();
}

function validateId(req, res, next) {
  const result = lookupIdSchema.safeParse(req.params.id);
  if (!result.success) {
    return res.status(400).json({ error: "Invalid lookup id" });
  }
  return next();
}

router.use(requireAuth, requireRole("superadmin"));
router.get("/", listLookups);
router.post("/:resource", validateResource, validateName, createLookup);
router.patch("/:resource/:id", validateResource, validateId, validateName, updateLookup);
router.delete("/:resource/:id", validateResource, validateId, deleteLookup);

export default router;
