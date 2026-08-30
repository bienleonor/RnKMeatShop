import { Router } from "express";
import {
  createProduct,
  listLookups,
  listProducts,
} from "../controllers/products.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { productCreateSchema } from "../validators/product.validator.js";

const router = Router();

router.use(requireAuth);
router.get("/lookups", listLookups);
router.get("/", listProducts);
router.post("/", (req, res, next) => {
  const result = productCreateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Enter valid product and inventory details" });
  }
  req.body = result.data;
  return createProduct(req, res, next);
});

export default router;
