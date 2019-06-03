import cloudinary from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import cloudStorage from 'multer-storage-cloudinary';

dotenv.config();
const storage = cloudStorage({
  cloudinary,
  folder: 'automart',
  allowedFormats: ['jpg', 'png'],
});

const parser = multer({ storage });

export default parser;
