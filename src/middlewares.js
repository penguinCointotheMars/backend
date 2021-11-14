import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { S3_ID, S3_SECRET } from "./credentials";
dotenv.config();
// import routes from "./routes";

// connect s3
const s3 = new aws.S3({
  credentials: {
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET,
  },
});

const multerPhoto = multer({
  storage: multerS3({
    s3, 
    acl: 'public-read',
    bucket: "easygoing/photos",
  }),
})



// delete photo
export const multerDelete = (params) => {
    s3.deleteObject(params, function (err, data) {
      if (data) {
        console.log("File deleted successfully");
      } else {
        console.log(err);
      }
    });
  };


// generate avatar url
const multerAvatar = multer({
    storage: multerS3({
      s3,
      acl: "public-read",
      bucket: "easygoing/avatar",
    }),
  });

export const uploadePhoto = multerPhoto.single("photoFile");
export const uploadAvatar = multerAvatar.single("avatar");



// export const localsMiddleware = (req, res, next) => {
//   res.locals.routes = routes;
//   res.locals.loggedUser = req.user || null;
//   console.log(req.user);

//   next();
// };
