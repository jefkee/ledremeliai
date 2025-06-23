import express from "express";
import { getALLProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getALLProducts);
router.post("/", createProduct);

export default router;