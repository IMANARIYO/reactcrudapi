import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
  export const uploadCloudinary = async file => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "imagesfolder",
      allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "js","docx"] // Add "js" to allow JavaScript files
    });
    return result.secure_url;
  } catch (error) {
    console.log("in utils cloudinary", error.message, error);
    throw error; 
  }
};
    


import multer from "multer";
import fs from "fs";
import path from "path";
async function ensureDir(directory) {
  try {
    await fs.promises.access(directory, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.mkdir(directory, { recursive: true });
    console.log("errors",e)
  }
}



export const storage = multer.diskStorage({
  destination(req, files, cb) {
    const dir = "images_container";
  ensureDir(dir);
    cb(null, "images_container");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage: storage });

export const uploaded = upload.fields([
  { name: "businessIdeaFile", maxCount: 1 },
  { name: "mainImage", maxCount: 1 },
  { name: "innovationDescription", maxCount: 1 },
  { name: "certificateOfRecentlyEducationLevel", maxCount: 1 },
  { name: "image", maxCount: 1 }
]);







