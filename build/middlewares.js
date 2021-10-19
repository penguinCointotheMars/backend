"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadePhoto = exports.uploadAvatar = exports.multerDelete = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // import routes from "./routes";
// connect s3


var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.S3_ID,
    secretAccessKey: process.env.S3_SECRET
  }
});
var multerPhoto = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: "easygoing/photos"
  })
}); // delete photo

var multerDelete = function multerDelete(params) {
  s3.deleteObject(params, function (err, data) {
    if (data) {
      console.log("File deleted successfully");
    } else {
      console.log(err);
    }
  });
}; // generate avatar url


exports.multerDelete = multerDelete;
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "easygoing/avatar"
  })
});
var uploadePhoto = multerPhoto.single("photoFile");
exports.uploadePhoto = uploadePhoto;
var uploadAvatar = multerAvatar.single("avatar"); // export const localsMiddleware = (req, res, next) => {
//   res.locals.routes = routes;
//   res.locals.loggedUser = req.user || null;
//   console.log(req.user);
//   next();
// };

exports.uploadAvatar = uploadAvatar;