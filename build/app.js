"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _photoRouter = _interopRequireDefault(require("./routers/photoRouter"));

var _testRouter = _interopRequireDefault(require("./routers/testRouter"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = require('express').Router();

var swaggerUi = require('swagger-ui-express');

var swaggerDocument = require('./swagger.json'); // import path from "path";
// import passport from "passport";
// import mongoose from "mongoose";
// import session from "express-session";
// import MongoStore from "connect-mongo";


// import { localsMiddleware } from './middlewares';
// import "./passport";
var app = (0, _express["default"])(); // const LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(User.authenticate()));

app.use((0, _helmet["default"])());
app.set("view engine", "pug"); // app.set("views", path.join(__dirname, "views"));

app.set("views", process.cwd() + "/src/views");
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev')); // app.use(passport.initialize());
// app.use(passport.session());
// app.use(localsMiddleware);
// home url

app.get(_routes["default"].home, function (req, res) {
  try {
    res.json({
      message: "server is connected"
    });
  } catch (_unused) {
    res.json({
      message: "server is not working"
    });
  }
}); // /test

app.use(_routes["default"].test, _testRouter["default"]); // /users

app.use(_routes["default"].users, _userRouter["default"]); // /photo

app.use(_routes["default"].photo, _photoRouter["default"]); // API-docs

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
var _default = app;
exports["default"] = _default;