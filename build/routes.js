"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Test


var TEST = "/test"; // Global

var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // User

var USERS = "/users";
var EDIT_PROFILE = "/edit-profile";
var USER_DETAIL = "/:id";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // Photos

var PHOTO = "/photo";
var UPLOAD = "/upload";
var PHOTO_DETAIL = "/:id";
var EDIT_PHOTO = "/edit";
var DELETE_PHOTO = "/delete"; // Google

var GOOGLE = "/auth/google";
var GOOGLE_CALLBACK = "auth/google/callback"; // Facebook

var FB = "/auth/facebook";
var FB_CALLBACK = "/auth/facebook/callback"; // API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var DELETE_COMMENT = "/:id/deletecomment";
var routes = {
  test: TEST,
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  photo: PHOTO,
  upload: UPLOAD,
  photoDetail: function photoDetail(id) {
    if (id) {
      return "/photos/".concat(id);
    } else {
      return PHOTO_DETAIL;
    }
  },
  editPhoto: EDIT_PHOTO,
  deletePhoto: DELETE_PHOTO,
  me: ME,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addcomment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT
};
var _default = routes;
exports["default"] = _default;