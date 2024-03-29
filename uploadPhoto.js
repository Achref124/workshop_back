
const express=require("express")
const cloudinary=require("cloudinary").v2
const multer=require("multer")
const streamifier=require("streamifier")
const upload = multer();

const router = express.Router();
router.post(
    '/photo',
    upload.single("photo"),
    async (req, res) => {
      console.log(req.file)
      try{
      const image='./images/Screenshot 2023-12-05 at 10.18.04AM.png'
      cloudinary.config({
        cloud_name: 'ddmv6rq8h', 
        api_key: '132333788773627', 
        api_secret: 'jdyrnCkkQFRX4JWkEun6Ra-mWc8'
      });
      const streamUpload = async(req) => {
        
        return new Promise(async(resolve, reject) => {
          const stream =  await cloudinary.uploader.upload(image).then((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }).catch(error=>console.log(error));
          
          
        });
      };
      const result = await streamUpload(req);
      
      res.send(result);
    }catch (error) {
      console.log(error)
    }} 
  );
 module.exports= router;