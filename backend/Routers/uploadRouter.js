import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils';
import config  from '../config';
import fs from "fs";
import expressAsyncHandler from 'express-async-handler';

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key:config.CLOUDINARY_API_KEY,
    api_secret:config.CLOUDINARY_API_SECRET
});
const uploadToCloudinary =(localFilePath)=>{
    const mainFolderName= "upload";
    let filePathOnCloudinary= mainFolderName+"/"+ localFilePath;

    return cloudinary.uploader
        .upload(localFilePath,{public_id: filePathOnCloudinary})
        .then((result)=>{
            fs.unlinkSync(localFilePath);
            return {
                message:"success",
                url:result.url,
            };
        })
        .catch((error)=>{
            fs.unlinkSync(localFilePath);
            return {
                message:"Fail",
            };
        })
}

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/');
    },
    filename(req,file,cb){
        cb(null,`${Date.now()}.jpg`);
    },
});

// const storage = new CloudinaryStorage({
//     cloudinary:cloudinary,
//     parmas:{
//         folder:"upload",
//         allowedFormats: ["jpg","jpeg","png"],
//         filename:function(req,file,cb){
//              cb(null,Date.now() +file.orginalname);
//         },
//     },
// });

const upload = multer({storage});
const uploadRouter =express.Router();

uploadRouter.post('/',isAuth,isAdmin,upload.single("image"), expressAsyncHandler(async (req,res,next)=>{
    let result =await uploadToCloudinary(req.file.path);
    res.status(201).send({image: result.url})
}));

export default uploadRouter;