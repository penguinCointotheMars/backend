"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadTest = exports.postUpload = exports.postSearch = exports.postEditPhoto = exports.postDeletePhoto = void 0;

var _middlewares = require("../middlewares");

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postSearch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, latt, _long, distance, photos;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, latt = _req$body.latt, _long = _req$body["long"], distance = _req$body.distance;
            if (!distance) 1000, _readOnlyError("distance");
            photos = [];
            _context.prev = 3;
            _context.next = 6;
            return Photo.find({
              GPS: {
                $near: {
                  $maxDistance: parseFloat(distance),
                  $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(_long), parseFloat(latt)]
                  }
                }
              }
            }).sort({
              _id: -1
            });

          case 6:
            photos = _context.sent;
            res.status(200).json({
              success: true,
              photos: photos,
              message: "".concat(photos.length, " photos were searched")
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            res.status(400).send(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function postSearch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postSearch = postSearch;

var postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, title, description, email, _long2, latt, location, uploader, newPhoto;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, email = _req$body2.email, _long2 = _req$body2["long"], latt = _req$body2.latt, location = req.file.location;
            _context2.prev = 1;
            _context2.next = 4;
            return User.findOne({
              email: email
            });

          case 4:
            uploader = _context2.sent;
            _context2.next = 7;
            return Photo.create({
              imageURL: location,
              thumbnailURL: location,
              title: title,
              description: description,
              GPS: {
                type: "Point",
                coordinates: [parseFloat(_long2), parseFloat(latt)]
              },
              creator: uploader.id
            });

          case 7:
            newPhoto = _context2.sent;
            uploader.photos.push(newPhoto.id);
            uploader.save();
            res.status(200).json({
              success: true,
              photo: newPhoto,
              message: "photo was uploaded"
            });
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(400).send(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));

  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var postEditPhoto = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, title, description, _id, photo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, title = _req$body3.title, description = _req$body3.description, _id = _req$body3._id;
            _context3.prev = 1;
            _context3.next = 4;
            return Photo.findOneAndUpdate({
              _id: _id
            }, {
              title: title,
              description: description
            });

          case 4:
            photo = _context3.sent;
            res.status(200).json({
              success: true,
              photo: photo,
              message: "photo was edited"
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(400).send(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function postEditPhoto(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postEditPhoto = postEditPhoto;

var uploadTest = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var body;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return req.body;

          case 2:
            body = _context4.sent;
            console.log(body);
            res.json(body);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function uploadTest(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.uploadTest = uploadTest;

var postDeletePhoto = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _id, photo, filename, params;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.body._id;
            _context5.prev = 1;
            _context5.next = 4;
            return Photo.findById({
              _id: _id
            });

          case 4:
            photo = _context5.sent;
            filename = photo.imageURL.split("/photos/")[1];
            params = {
              Bucket: "lsns/photos",
              Key: filename
            };
            (0, _middlewares.multerDelete)(params);
            _context5.next = 10;
            return Photo.findOneAndDelete({
              _id: _id
            });

          case 10:
            res.status(200).json({
              success: true,
              message: "photo was deleted"
            });
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.status(400).send(_context5.t0);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 13]]);
  }));

  return function postDeletePhoto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postDeletePhoto = postDeletePhoto;