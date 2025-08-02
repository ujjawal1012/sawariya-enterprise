import express from 'express';
import multer from 'multer';
import { getProducts } from '../controllers/product.controller.js';

const router = express.Router();
router.get('/', getProducts);

export default router;
