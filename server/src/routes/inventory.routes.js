import { Router } from "express";
import {
  listInventory,
  receiveStock,
} from "../controllers/inventory.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { stockReceiptSchema } from "../validators/product.validator.js";

const router = Router();

router.use(requireAuth);
router.get("/", listInventory);
router.post("/:productId/stock", (req, res, next) => {
  const result = stockReceiptSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Enter a valid positive stock quantity" });
  }
  req.body = result.data;
  return receiveStock(req, res, next);
});

export default router;
