"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.postGoogleJoin = exports.postChangePassword = exports.getUsers = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nanoid = require("nanoid");

var _db = _interopRequireDefault(require("../db_module/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import passport from "passport";
// import { OAuth2Client } from "google-auth-library";
// import app from '../app';
// const client = new OAuth2Client(process.env.CLIENT_ID)
var getUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _db["default"].query('SELECT * FROM user_credential LIMIT 100', function (err, result) {
              if (err) throw err;

              if (result.length > 0) {
                var allUsers = [];
                result.forEach(function (e) {
                  var user = {
                    email: e.email,
                    name: e.name,
                    user_id: e.user_id
                  };
                  allUsers.push(user);
                });
                res.status(200).json({
                  success: true,
                  user: allUsers,
                  message: "User credentials limited 100"
                });
              } else {
                res.status(400).json({
                  success: false,
                  message: "Not found user information"
                });
              }
            });

            _context.next = 7;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));

  return function getUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var postJoin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, email, password, name, birth_date, saltRounds, salt, hashedPassword, user, newUserId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name, birth_date = _req$body.birth_date;
            saltRounds = 10;
            salt = _bcrypt["default"].genSaltSync(saltRounds);
            _context2.next = 6;
            return _bcrypt["default"].hash(password, salt);

          case 6:
            hashedPassword = _context2.sent;
            user = {
              email: email,
              password: hashedPassword,
              name: name,
              birth_date: birth_date
            };
            newUserId = (0, _nanoid.nanoid)();

            _db["default"].query('SELECT * FROM user_credential WHERE email = ?', email, function (err, result) {
              if (err) throw err;
              if (result.length > 0) res.status(400).json({
                success: false,
                message: "You are already registered"
              });else {
                _db["default"].query('SELECT 1 FROM user_credential WHERE user_id = ?', newUserId, function (err, results) {
                  if (err) throw err;
                  if (results.length > 0) newUserId = (0, _nanoid.nanoid)();
                });

                user['user_id'] = newUserId;

                _db["default"].query('INSERT INTO user_credential SET ?', user, function (err) {
                  if (err) throw err;else {
                    res.status(200).json({
                      success: true,
                      message: "You are successfully registered",
                      email: email
                    }); // insertId add as asending 
                  }
                });
              }
            });

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function postJoin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var postLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, email, password;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            _db["default"].query('SELECT * FROM user_credential WHERE email = ?', email, /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, result) {
                var hashedPassword, loggedUser;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                        if (!(result.length === 0)) {
                          _context3.next = 6;
                          break;
                        }

                        res.status(400).json({
                          success: false,
                          message: "Email is incorrect"
                        });
                        _context3.next = 16;
                        break;

                      case 6:
                        if (result.length !== 1) console.log("😱😱😱😱😱 Error : user email is duplicated. Please check DB!");
                        hashedPassword = result[0].password;
                        _context3.next = 10;
                        return _bcrypt["default"].compare(password, hashedPassword);

                      case 10:
                        if (!_context3.sent) {
                          _context3.next = 15;
                          break;
                        }

                        loggedUser = {
                          email: email,
                          user_id: result[0].user_id
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
                          message: "Password is incorrect"
                        });

                      case 16:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }());

            _context4.next = 8;
            break;

          case 5:
            _context4.prev = 5;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 5]]);
  }));

  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //         var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {
// 		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
// 			if (results.length > 0) {
// 				request.session.loggedin = true;
// 				request.session.username = username;
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
//         const user = await User.findOne({email : req.body.email});
//         if(user !== null){
//             res.status(400).json({success: false, message : "You are already registered"});
//         }else{
//             const hashedPassword = await bcrypt.hash(req.body.password, 10);
//             const user = await User.create({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: hashedPassword,
//             });
//             res.status(200).json({success: true, user : user, message: "Your account has been saved"});
//         }
//     }catch(err){
//         res.status(400).json({err : err});
//     }
// }


exports.postLogin = postLogin;

var postGoogleJoin = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {} catch (err) {}

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postGoogleJoin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // export const postLogin = async (req, res) => {
//     try{
//         const user = await User.findOne({email : req.body.email});
//         if(user === null){
//             res.status(400).json({success: false, message : "email is incorrect"});
//         }else{
//             if(await bcrypt.compare(req.body.password, user.password)){
//                 const loggedUser = {
//                     email : user.email,
//                     _id : user._id,
//                     photos : user.photos,
//                     comments : user.comments, 
//                     username: user.username ? user.username : "",
//                 }
//                 res.status(200).json({success: true, user : loggedUser, message : "Login success"});
//             }else{
//                 res.status(400).json({success: false, message : "password is incorrect"});
//             }
//         }
//     }catch(error){
//         res.status(400).json({err : err});
//     }
// }


exports.postGoogleJoin = postGoogleJoin;

var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var user, password, _user;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return User.findOne({
              email: req.body.email
            });

          case 3:
            user = _context6.sent;

            if (!(req.body.password === req.body.newpassword)) {
              _context6.next = 8;
              break;
            }

            res.status(400).json({
              success: false,
              message: "new password is same"
            });
            _context6.next = 21;
            break;

          case 8:
            _context6.next = 10;
            return _bcrypt["default"].compare(req.body.password, user.password);

          case 10:
            if (_context6.sent) {
              _context6.next = 14;
              break;
            }

            res.status(400).json({
              success: false,
              message: "wrong password"
            });
            _context6.next = 21;
            break;

          case 14:
            _context6.next = 16;
            return _bcrypt["default"].hash(req.body.newpassword, 10);

          case 16:
            password = _context6.sent;
            _context6.next = 19;
            return User.findOneAndUpdate({
              email: req.body.email
            }, {
              password: password
            });

          case 19:
            _user = _context6.sent;
            res.status(200).json({
              success: true,
              user: _user,
              message: "successfully password was changed"
            });

          case 21:
            _context6.next = 26;
            break;

          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](0);
            res.status(400).json({
              err: err
            });

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 23]]);
  }));

  return function postChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
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