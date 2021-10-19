"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _middlewares = require("../middlewares");

var _photoController = require("../controllers/photoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var photoRouter = _express["default"].Router(); // 'photo/search' 
// post : {location : [long, latt], distance : distance}


photoRouter.post(_routes["default"].search, _photoController.postSearch); //'photo/upload'
// post : {title, description, location, _id, imageData}
// photoRouter.post(routes.upload, uploadTest);

photoRouter.post(_routes["default"].upload, _middlewares.uploadePhoto, _photoController.postUpload);
photoRouter.post(_routes["default"].editPhoto, _photoController.postEditPhoto);
photoRouter.post(_routes["default"].deletePhoto, _photoController.postDeletePhoto);
var _default = photoRouter;
exports["default"] = _default;