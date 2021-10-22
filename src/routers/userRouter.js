import express from 'express'; 
import routes from "../routes";
import { getUsers, postChangePassword, postGoogleJoin, postJoin, postLogin, postEditProfile } from '../controllers/userController';
import {uploadAvatar} from '../middlewares';
const userRouter = express.Router(); 

// get users. just for test 
userRouter.get(routes.home, getUsers)

// local authentication
userRouter.post(routes.join, postJoin);
userRouter.post(routes.login, postLogin)
// userRouter.post(routes.changePassword, postChangePassword)

// Google authentication
// To do : add passport.js
// userRouter.post(routes.google, postGoogleJoin)

// profile upload 
// After join, user can upload profile image
// user_id is used to verificate uploader
// To do : if file is not, just change other things.
//         Just change factors passed from user not update whole factors
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);


//id verification
//To do : how ? and how store ? just boolean? true false? or store some information? 



export default userRouter;


