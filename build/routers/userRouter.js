"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get(_routes["default"].home, _userController.getUsers);
userRouter.post(_routes["default"].join, _userController.postJoin);
userRouter.post(_routes["default"].google, _userController.postGoogleJoin);
userRouter.post(_routes["default"].login, _userController.postLogin);
userRouter.post(_routes["default"].changePassword, _userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;