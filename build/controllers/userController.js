"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postLogin = exports.postJoin = exports.postEditProfile = exports.getUsers = void 0;

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
            try {
              _db["default"].query('SELECT * FROM user_credential LIMIT 100', function (err, result) {
                if (err) res.status(400).json({
                  err: err
                });

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
            } catch (err) {
              res.status(400).json({
                err: err
              });
            }

          case 1:
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
    var _req$body, email, password, name, birthDate, address, phoneNumber, userType, description, saltRounds, salt, hashedPassword, user, newUserId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name, birthDate = _req$body.birthDate, address = _req$body.address, phoneNumber = _req$body.phoneNumber, userType = _req$body.userType, description = _req$body.description;
            _context2.prev = 1;

            if (!(email == "" || password == "" || name == "" || birthDate == "" || address == "" || phoneNumber == "" || userType == "" || description == "")) {
              _context2.next = 6;
              break;
            }

            res.status(400).json({
              success: false,
              message: "Please fully fill fields!"
            });
            _context2.next = 30;
            break;

          case 6:
            if (/^[a-zA-Z ]*$/.test(name)) {
              _context2.next = 10;
              break;
            }

            res.status(400).json({
              success: false,
              message: "Invalid name"
            });
            _context2.next = 30;
            break;

          case 10:
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
              _context2.next = 14;
              break;
            }

            res.status(400).json({
              success: false,
              message: "Invalid email"
            });
            _context2.next = 30;
            break;

          case 14:
            if (new Date(birthDate).getTime()) {
              _context2.next = 18;
              break;
            }

            res.status(400).json({
              success: false,
              message: "Invalid date of birth entered"
            });
            _context2.next = 30;
            break;

          case 18:
            if (!(password.length < 8)) {
              _context2.next = 22;
              break;
            }

            res.status(400).json({
              success: false,
              message: "Password is too short!"
            });
            _context2.next = 30;
            break;

          case 22:
            saltRounds = 10;
            salt = _bcrypt["default"].genSaltSync(saltRounds);
            _context2.next = 26;
            return _bcrypt["default"].hash(password, salt);

          case 26:
            hashedPassword = _context2.sent;
            user = {
              email: email,
              password: hashedPassword,
              name: name,
              birth_date: birthDate,
              address: address,
              phone_number: phoneNumber,
              user_type: userType,
              description: description
            };
            newUserId = (0, _nanoid.nanoid)();

            _db["default"].query('SELECT * FROM user_credential WHERE email = ?', email, function (err, result) {
              if (err) res.status(400).json({
                err: err
              });
              if (result.length > 0) res.status(400).json({
                success: false,
                message: "You are already registered"
              });else {
                _db["default"].query('SELECT 1 FROM user_credential WHERE user_id = ?', newUserId, function (err, results) {
                  if (err) res.status(400).json({
                    err: err
                  });
                  if (results.length > 0) newUserId = (0, _nanoid.nanoid)();
                });

                user['user_id'] = newUserId;

                _db["default"].query('INSERT INTO user_credential SET ?', user, function (err) {
                  if (err) res.status(400).json({
                    err: err
                  });else {
                    var loggedUser = {
                      email: email,
                      user_id: newUserId
                    };
                    res.status(200).json({
                      success: true,
                      message: "You are successfully registered",
                      user: loggedUser
                    }); // insertId add as asending 
                  }
                });
              }
            });

          case 30:
            _context2.next = 35;
            break;

          case 32:
            _context2.prev = 32;
            _context2.t0 = _context2["catch"](1);
            res.status(400).json({
              err: _context2.t0
            });

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 32]]);
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
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            try {
              if (email == "" || password == "") {
                res.status(400).json({
                  success: false,
                  message: "Please fully fill fields!"
                });
              } else {
                _db["default"].query('SELECT * FROM user_credential WHERE email = ?', email, /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, result) {
                    var hashedPassword, loggedUser;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (err) res.status(400).json({
                              err: err
                            });

                            if (!(result.length === 0)) {
                              _context3.next = 5;
                              break;
                            }

                            res.status(400).json({
                              success: false,
                              message: "Email is incorrect"
                            });
                            _context3.next = 15;
                            break;

                          case 5:
                            if (result.length !== 1) console.log("😱😱😱😱😱 Error : user email is duplicated. Please check DB!");
                            hashedPassword = result[0].password;
                            _context3.next = 9;
                            return _bcrypt["default"].compare(password, hashedPassword);

                          case 9:
                            if (!_context3.sent) {
                              _context3.next = 14;
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
                            _context3.next = 15;
                            break;

                          case 14:
                            res.status(400).json({
                              success: false,
                              message: "Password is incorrect"
                            });

                          case 15:
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
              }
            } catch (err) {
              res.status(400).json({
                err: err
              });
            }

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // export const postGoogleJoin = async (req, res) => {
//     try{
//     }catch(err){
//     }
// }
// export const postChangePassword = async (req, res) => {
//     try{
//         const user = await User.findOne({email : req.body.email});
//         if(req.body.password === req.body.newpassword){
//             res.status(400).json({success: false, message: "new password is same"});
//         }
//         else if(!(await bcrypt.compare(req.body.password, user.password))){
//             res.status(400).json({success: false, message: "wrong password"});
//         }else{
//                 const password = await bcrypt.hash(req.body.newpassword, 10);
//                 const user = await User.findOneAndUpdate({ email: req.body.email }, { password});
//                 res.status(200).json({success : true, user : user,  message : "successfully password was changed"});
//         }
//     }catch(error){
//         res.status(400).json({err : err});
//     }
// }


exports.postLogin = postLogin;

var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, user_id, email, address, phoneNumber, userType, description, location;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, user_id = _req$body3.user_id, email = _req$body3.email, address = _req$body3.address, phoneNumber = _req$body3.phoneNumber, userType = _req$body3.userType, description = _req$body3.description, location = req.file.location;
            console.log(user_id, email);

            try {
              _db["default"].query('SELECT * FROM user_credential WHERE user_id = ? AND email = ?', [user_id, email], function (err, result) {
                if (err) res.status(400).json({
                  err: err
                });

                if (result.length > 1) {
                  res.status(400).json({
                    success: false,
                    message: "😨😨😨😨 user_id is duplicated! Please check DB!"
                  });
                } else {
                  var userUpdate = {
                    address: address,
                    phone_number: phoneNumber,
                    user_type: userType,
                    description: description,
                    profile_url: location
                  };

                  _db["default"].query("UPDATE user_credential SET ? WHERE user_id = ?", [userUpdate, result[0].user_id], function (err, results) {
                    if (err) res.status(400).json({
                      success: false,
                      err: err
                    });else {
                      res.status(200).json({
                        success: true,
                        user: userUpdate,
                        message: "😉 user profile update is completed!"
                      });
                    }
                  });
                }
              });
            } catch (err) {
              res.status(400).json({
                err: err
              });
            }

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postEditProfile(_x9, _x10) {
    return _ref5.apply(this, arguments);
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


exports.postEditProfile = postEditProfile;