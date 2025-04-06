import dotenv from 'dotenv';  // Import dotenv to load environment variables
import cloudinary from 'cloudinary';

// Load environment variables from the .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2;
