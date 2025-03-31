import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAdmin, isAuth } from '../utils.js';
dotenv.config();
const upload = multer();

const uploadRouter = express.Router();


uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {

    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);

      const secure_url = result.secure_url
      res.send({secure_url});
   
    } catch (error) {
  
      res.status(500).send('Internal Server Error');
    }
  }
);
export default uploadRouter;
