"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PhotoSchema = new _mongoose["default"].Schema({
  imageURL: {
    type: String,
    required: "image URL is required"
  },
  thumbnailURL: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Tilte is required"
  },
  description: {
    type: String
  },
  GPS: {
    type: {
      type: String
    },
    coordinates: []
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  likes: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
});
PhotoSchema.index({
  GPS: "2dsphere"
});

var model = _mongoose["default"].model("Photo", PhotoSchema);

var _default = model;
exports["default"] = _default;