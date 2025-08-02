// routes/product.routes.js
import express from 'express';
import upload from '../middlewares/cloudinary.middleware.js';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { Product } from '../models/Product.js'; 

const router = express.Router();

// CREATE PRODUCT
router.post(
  '/upload',
  requireAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        originalPrice,
        description,
        brand,
        inStock,
        specifications
      } = req.body;
      console.log("🚀 ~ req.body:", req.body)

      const imageUrl = req.files?.image?.[0]?.path;
      const additionalImageUrls = req.files?.additionalImages?.map(file => file.path) || [];

      let parsedSpecifications;
      try {
        parsedSpecifications = typeof specifications === 'string'
          ? JSON.parse(specifications)
          : specifications;
      } catch (err) {
        return res.status(400).json({ message: 'Invalid JSON format for specifications' });
      }

      const product = new Product({
        name,
        category,
        price,
        originalPrice,
        image: imageUrl,
        additionalImages: additionalImageUrls,
        description,
        brand,
        inStock,
        specifications: parsedSpecifications
      });

      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error uploading product:', error);
      res.status(500).json({ message: 'Failed to upload product.' });
    }
  }
);

// UPDATE PRODUCT
router.put(
  '/product/:id',
  requireAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        category,
        price,
        originalPrice,
        description,
        brand,
        inStock,
        specifications
      } = req.body;

      const imageUrl = req.files?.image?.[0]?.path;
      const additionalImageUrls = req.files?.additionalImages?.map(file => file.path) || [];

      let parsedSpecifications;
      try {
        parsedSpecifications = typeof specifications === 'string'
          ? JSON.parse(specifications)
          : specifications;
      } catch (err) {
        return res.status(400).json({ message: 'Invalid JSON format for specifications' });
      }

      const updatedFields = {
        name,
        category,
        price,
        originalPrice,
        description,
        brand,
        inStock,
        specifications: parsedSpecifications
      };

      if (imageUrl) updatedFields.image = imageUrl;
      if (additionalImageUrls.length > 0) updatedFields.additionalImages = additionalImageUrls;

      const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product.' });
    }
  }
);

router.delete('/product/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product.' });
  }
});


export default router;


