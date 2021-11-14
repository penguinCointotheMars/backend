"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); // get users. just for test 


userRouter.get(_routes["default"].home, _userController.getUsers); // local authentication

userRouter.post(_routes["default"].join, _userController.postJoin);
userRouter.post(_routes["default"].login, _userController.postLogin); // userRouter.post(routes.changePassword, postChangePassword)
// Google authentication
// To do : add passport.js
// userRouter.post(routes.google, postGoogleJoin)
// profile upload 
// After join, user can upload profile image
// user_id is used to verificate uploader
// To do : if file is not, just change other things.
//         Just change factors passed from user not update whole factors

userRouter.post(_routes["default"].editProfile, _middlewares.uploadAvatar, _userController.postEditProfile); //id verification
//To do : how ? and how store ? just boolean? true false? or store some information? 

var _default = userRouter;
exports["default"] = _default;