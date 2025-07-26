import { Product } from '../models/Product.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

export const uploadProduct = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: result.secure_url,
    });
    await newProduct.save();
    fs.unlinkSync(req.file.path); // delete local file
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
