"use strict";

var _mysql = _interopRequireDefault(require("mysql"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var db = _mysql["default"].createPool({
  connectionLimit: 10,
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  acquireTimeout: 600000,
  password: process.env.RDS_PASSWORD,
  database: database,
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