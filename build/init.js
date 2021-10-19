"use strict";

require("regenerator-runtime");

require("./db_module/db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 8080;

var handelListening = function handelListening() {
  return console.log("\u2705 Listening on : http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handelListening);