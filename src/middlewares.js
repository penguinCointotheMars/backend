import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

// connect s3
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multerPhoto = multer({
  storage: multerS3({
    s3, 
    acl: 'public-read',
    bucket: "lsns/photos",
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
      bucket: "lsns/avatar",
    }),
  });

export const uploadePhoto = multerPhoto.single("photoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log(req.user);

  next();
};
