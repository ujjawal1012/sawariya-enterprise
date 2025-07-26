import { v2 as cloudinary } from 'cloudinary';
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: "dryaaoekq",
  api_key: 175939456297523,
  api_secret:"3sed9bY4xVjwe9yhghRp1wifoyc",
});

export default cloudinary;
