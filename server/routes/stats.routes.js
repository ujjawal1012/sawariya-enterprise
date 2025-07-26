import express from 'express';
import { products, users } from '../data/store.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ totalUsers: users.length, totalProducts: products.length });
});

export default router;