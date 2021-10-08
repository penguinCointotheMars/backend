import express from "express";
import routes from "../routes";
import { uploadePhoto } from "../middlewares";
import {uploadTest, postDeletePhoto, postEditPhoto, postSearch, postUpload } from "../controllers/photoController";

const photoRouter = express.Router();



// 'photo/search' 
// post : {location : [long, latt], distance : distance}
photoRouter.post(routes.search, postSearch);

//'photo/upload'
// post : {title, description, location, _id, imageData}
// photoRouter.post(routes.upload, uploadTest);
photoRouter.post(routes.upload, uploadePhoto, postUpload);

photoRouter.post(routes.editPhoto, postEditPhoto);

photoRouter.post(routes.deletePhoto, postDeletePhoto)



export default photoRouter;






