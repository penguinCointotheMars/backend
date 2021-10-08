import express from "express";
import routes from "../routes";
import { getChangePassword, getDeletePhoto, getEditPhoto, getJoin, getLogin, getSearch, getUpload } from "../controllers/testController";

const testRouter = express.Router();

// 테스트용 view를 제공하는 Router. 실제 사용되는 post url들을 사용


testRouter.get(routes.home, function(req, res) {
    res.json({message:"test"});
})

testRouter.get(routes.join,  getJoin);
testRouter.get(routes.login, getLogin);
testRouter.get(routes.changePassword, getChangePassword);

testRouter.get(routes.upload, getUpload);
testRouter.get(routes.search, getSearch);
testRouter.get(routes.editPhoto, getEditPhoto);
testRouter.get(routes.deletePhoto, getDeletePhoto);

export default testRouter;