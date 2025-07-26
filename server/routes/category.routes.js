import express from 'express';
import { products } from '../data/store.js';

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

export default router;