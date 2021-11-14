"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _credentials = require("../credentials");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var db = _mysql["default"].createPool({
  connectionLimit: 10,
  host: _credentials.RDS_HOSTNAME,
  user: _credentials.RDS_USERNAME,
  acquireTimeout: 600000,
  password: _credentials.RDS_PASSWORD,
  database: _credentials.RDS_DB,
  multipleStatements: true
});

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  return console.log("\u274C Error on DB Connection : ".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError);
var _default = db;
exports["default"] = _default;