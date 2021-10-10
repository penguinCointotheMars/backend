"use strict";

var _faker = _interopRequireDefault(require("faker"));

var _User = _interopRequireDefault(require("./src/models/User"));

var _Photo = _interopRequireDefault(require("./src/models/Photo"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config(); // mongoose.connect(process.env.MONGO_URL_PROD,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//   }
// );


_mongoose["default"].connect(process.env.MONGO_URL_PROD, {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  return console.log("\u274C Error on DB Connection : ".concat(error));
};

db.once("open", handleOpen);
db.on("error", handleError);

var randomName = _faker["default"].name.findName();

var randomEmail = _faker["default"].internet.email();

var randomTitle = _faker["default"].random.word();

var randomDescription = _faker["default"].random.words();

var randomLatt = 34.5 + Math.random();
var randomLong = 34.5 + Math.random();

var randomImg = _faker["default"].image.image();

var password = '123';

var fakeUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            randomName = _faker["default"].name.findName();
            randomEmail = _faker["default"].internet.email();
            _context.next = 4;
            return _User["default"].create({
              username: randomName,
              email: randomEmail,
              password: password
            });

          case 4:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fakeUser() {
    return _ref.apply(this, arguments);
  };
}();

var fakeImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            randomTitle = _faker["default"].random.word();
            randomDescription = _faker["default"].random.words();
            randomLatt = 35 + Math.random();
            randomLong = 35 + Math.random();
            randomImg = _faker["default"].image.image();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fakeImage(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var round = 0;

for (var i = 0; i <= 10; i++) {
  var user = fakeUser().then( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(user) {
      var newPhoto;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              round++;
              console.log("".concat(round, " user joined"));
              randomTitle = _faker["default"].random.word();
              randomDescription = _faker["default"].random.words();
              randomLatt = 35 + Math.random() * 2;
              randomLong = 35 + Math.random() * 2;
              randomImg = _faker["default"].image.imageUrl();
              _context3.next = 9;
              return _Photo["default"].create({
                imageURL: randomImg,
                thumbnailURL: randomImg,
                title: randomTitle,
                description: randomDescription,
                GPS: {
                  type: "Point",
                  coordinates: [randomLatt, randomLong]
                },
                creator: user.id
              });

            case 9:
              newPhoto = _context3.sent;
              user.photos.push(newPhoto.id);
              user.save();

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
} // export const postUpload = async(req, res) => {
//     const {
//         body: { title, description, email, long, latt},
//         file : {location}
//     } = req;
//     try{
//         const uploader = await User.findOne({email});
//         const newPhoto = await Photo.create({
//             imageURL: location,
//             thumbnailURL: location,
//             title,
//             description,
//             GPS : {
//                 type: "Point",
//                 coordinates: [parseFloat(long), parseFloat(latt)]
//             },
//             creator: uploader.id
//         })
//         uploader.photos.push(newPhoto.id);
//         uploader.save();
//         res.status(200).json({success: true, photo : newPhoto, message: "photo was uploaded"});
//     }catch(error){
//         console.log(error);
//         res.status(400).send(error);
//     }
// }
//