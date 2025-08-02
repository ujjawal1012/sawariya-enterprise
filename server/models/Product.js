// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String }, // main image
  additionalImages: [{ type: String }], // 🆕 array of image URLs
  description: { type: String },
  brand: { type: String },
  inStock: { type: Boolean },
  specifications: { type: Object },
});

export const Product = mongoose.model('Product', productSchema);
