"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.postChangePassword = exports.getUsers = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _db = _interopRequireDefault(require("../db_module/db"));

var _googleAuthLibrary = require("google-auth-library");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var client = new _googleAuthLibrary.OAuth2Client(process.env.CLIENT_ID);

var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.find({}).sort({
              _id: -1
            });

          case 2:
            users = _context.sent;
            res.status(200).json({
              users: users
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var postJoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, hashedPassword, _user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return User.findOne({
              email: req.body.email
            });

          case 3:
            user = _context2.sent;

            if (!(user !== null)) {
              _context2.next = 8;
              break;
            }

            res.status(400).json({
              success: false,
              message: "You are already registered"
            });
            _context2.next = 15;
            break;

          case 8:
            _context2.next = 10;
            return _bcrypt["default"].hash(req.body.password, 10);

          case 10:
            hashedPassword = _context2.sent;
            _context2.next = 13;
            return User.create({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword
            });

          case 13:
            _user = _context2.sent;
            res.status(200).json({
              success: true,
              user: _user,
              message: "Your account has been saved"
            });

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              err: _context2.t0
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function postJoin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var postLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, loggedUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return User.findOne({
              email: req.body.email
            });

          case 3:
            user = _context3.sent;

            if (!(user === null)) {
              _context3.next = 8;
              break;
            }

            res.status(400).json({
              success: false,
              message: "email is incorrect"
            });
            _context3.next = 16;
            break;

          case 8:
            _context3.next = 10;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 10:
            if (!_context3.sent) {
              _context3.next = 15;
              break;
            }

            loggedUser = {
              email: user.email,
              _id: user._id,
              photos: user.photos,
              comments: user.comments,
              username: user.username ? user.username : ""
            };
            res.status(200).json({
              success: true,
              user: loggedUser,
              message: "Login success"
            });
            _context3.next = 16;
            break;

          case 15:
            res.status(400).json({
              success: false,
              message: "password is incorrect"
            });

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            res.status(400).json({
              err: err
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var postChangePassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var user, password, _user2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return User.findOne({
              email: req.body.email
            });

          case 3:
            user = _context4.sent;

            if (!(req.body.password === req.body.newpassword)) {
              _context4.next = 8;
              break;
            }

            res.status(400).json({
              success: false,
              message: "new password is same"
            });
            _context4.next = 21;
            break;

          case 8:
            _context4.next = 10;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 10:
            if (_context4.sent) {
              _context4.next = 14;
              break;
            }

            res.status(400).json({
              success: false,
              message: "wrong password"
            });
            _context4.next = 21;
            break;

          case 14:
            _context4.next = 16;
            return _bcrypt["default"].hash(req.body.newpassword, 10);

          case 16:
            password = _context4.sent;
            _context4.next = 19;
            return User.findOneAndUpdate({
              email: req.body.email
            }, {
              password: password
            });

          case 19:
            _user2 = _context4.sent;
            res.status(200).json({
              success: true,
              user: _user2,
              message: "successfully password was changed"
            });

          case 21:
            _context4.next = 26;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({
              err: err
            });

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 23]]);
  }));

  return function postChangePassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // using passportjs
//     const Users = new User({email : req.body.email});
//     User.register(Users, req.body.password, function(err, user){
//         if(err){
//             res.json({success: false, message : "Your account could not be saved. Error : ", err});
//         }else{
//             res.json({success: true, user : user, message: "Your account has been saved"});
//         }
//     });
// });
// userRouter.post(routes.login,
//   passport.authenticate('local'),
//   function(req, res) {
//       console.log("hello");
//     res.json({success:true, message:"Authentication successful"});
//   });
// userRouter.post(routes.login, function(req, res){
//     console.log("here");
//     res.json({success: true});
// })
// userRouter.post(routes.login, function(req, res){
//     if(!req.body.email){
//         res.json({success: false, message: "email was not given"})
//     }else{
//         if(!req.body.password){
//             res.json({success: false, message: "Password was not given"})
//         }else{
//             passport.authenticate('local', function(err, user, info){
//                 if(err){
//                     res.json({success: false, message: err})
//                 }else{
//                     if(!user){
//                         res.json({success: false, message: 'email or password incorrect'})
//                     }else{
//                         req.login(user, async function(err){
//                             if(err){
//                                 res.json({success: false, message: err})
//                             }else{
//                                 const token = await jwt.sign({userId : user._id, 
//                                     email:user.email}, secretkey, 
//                                        {expiresIn: '24h'})
//                                 res.json({success:true, message:"Authentication successful", token: token });
//                             }
//                         })
//                     }
//                 }
//             }) (req, res);
//         }
//     }
// });


exports.postChangePassword = postChangePassword;