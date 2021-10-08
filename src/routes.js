import dotenv from "dotenv";
dotenv.config();

// Test
const TEST = "/test";

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// User
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const USER_DETAIL = "/:id";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Photos
const PHOTO = "/photo";
const UPLOAD = "/upload";
const PHOTO_DETAIL = "/:id";
const EDIT_PHOTO = "/edit";
const DELETE_PHOTO = "/delete";

// Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/deletecomment";


const routes = {
  test:TEST,
  home:HOME,
  join:JOIN,
  login:LOGIN,
  logout:LOGOUT,
  search:SEARCH,
  users:USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  photo: PHOTO,
  upload: UPLOAD,
  photoDetail: (id) => {
    if (id) {
      return `/photos/${id}`;
    } else {
      return PHOTO_DETAIL;
    }
  },
  editPhoto: EDIT_PHOTO,
  deletePhoto: DELETE_PHOTO,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addcomment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;
