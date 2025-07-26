import bcrypt from 'bcryptjs';
import User from '../models/user.js'; 

export async function initializeAdmin() {
  const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true,
    });
    console.log('✅ Admin user created');
  }
}
