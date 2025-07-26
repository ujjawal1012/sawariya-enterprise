import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';
import categoryRoutes from './routes/category.routes.js';
import statsRoutes from './routes/stats.routes.js';
import { initializeAdmin } from './utils/admin.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { connectDB } from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
connectDB()
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin/stats', statsRoutes);

// Error handling
app.use(errorHandler);
// app.use('*', notFoundHandler);

// Start server
const startServer = async () => {
  await initializeAdmin();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin: ${process.env.ADMIN_EMAIL}`);
  });
};

startServer();
