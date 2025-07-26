import express from 'express';
import multer from 'multer';
import { uploadProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), uploadProduct);
router.get('/', getProducts);

export default router;
