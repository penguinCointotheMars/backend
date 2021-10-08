import express from 'express'; 
import routes from "../routes";
import { getUsers, postChangePassword, postJoin, postLogin } from '../controllers/userController';

const userRouter = express.Router(); 

userRouter.get(routes.home, getUsers)

userRouter.post(routes.join, postJoin);

userRouter.post(routes.login, postLogin)

userRouter.post(routes.changePassword, postChangePassword)


export default userRouter;


