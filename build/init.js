"use strict";

require("regenerator-runtime");

require("./db_module/db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _credentials = require("./credentials");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var SELECTED_PORT = _credentials.PORT || 3000;

var handelListening = function handelListening() {
  return console.log("\u2705 Listening on : http://localhost:".concat(SELECTED_PORT));
};

_app["default"].listen(SELECTED_PORT, handelListening);