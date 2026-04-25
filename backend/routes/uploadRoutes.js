import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No image provided' });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'velaluxora',
    });
    fs.unlinkSync(req.file.path);
    res.send({
      message: 'Image Uploaded Successfully',
      image: result.secure_url, 
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).send({ message: error.message });
  }
});

export default router;