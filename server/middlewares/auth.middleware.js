import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const requireAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user; // pass user to next middleware
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
