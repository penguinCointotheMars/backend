import bcrypt from "bcrypt";
import {nanoid} from 'nanoid';
import db from '../db_module/db';
// import passport from "passport";
// import { OAuth2Client } from "google-auth-library";
// import app from '../app';
// const client = new OAuth2Client(process.env.CLIENT_ID)

export const getUsers = async (req, res) =>{
    try{
        db.query('SELECT * FROM user_credential LIMIT 100', function(err, result){
            if(err) throw err;

            if(result.length > 0){
                let allUsers = [];
                result.forEach(e => {
                    const user = {
                        email : e.email,
                        name : e.name,
                        user_id : e.user_id
                    };
                    allUsers.push(user);
                });
                res.status(200).json({success : true, user : allUsers, message : "User credentials limited 100"});
            }else{
                res.status(400).json({success : false, message : "Not found user information"});
            }
        });
    }catch(err){
        throw err;
    }
}

export const postJoin = async (req, res) => {
    try{
        const { email, password, name, birth_date } = req.body;
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            email : email,
            password : hashedPassword,
            name : name,
            birth_date : birth_date
        };
        let newUserId = nanoid();
        db.query('SELECT * FROM user_credential WHERE email = ?', email, function(err, result) {
            if(err) throw err;
            
            if(result.length > 0) res.status(400).json({success: false, message : "You are already registered"});
            else{
                db.query('SELECT 1 FROM user_credential WHERE user_id = ?', newUserId, function(err, results) { 
                    if(err) throw err;
                    if(results.length > 0) newUserId = nanoid();
                
                })
                user['user_id'] = newUserId;

                db.query('INSERT INTO user_credential SET ?', user, function(err){
                    if(err) throw err;
                    else{
                        res.status(200).json({success : true, message : "You are successfully registered",  email : email});
                        // insertId add as asending 
                    }
                })}
            });
        }
        catch(err){
            throw err;
        }
    }

export const postLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        db.query('SELECT * FROM user_credential WHERE email = ?', email, async function(err, result){
            if (err) throw err;

            if(result.length === 0) res.status(400).json({success : false, message : "Email is incorrect"});
            else{
                if(result.length !== 1) console.log("😱😱😱😱😱 Error : user email is duplicated. Please check DB!")
                const hashedPassword = result[0].password;

                if(await bcrypt.compare(password, hashedPassword)){
                    const loggedUser = {
                        email : email,
                        user_id : result[0].user_id,
                    }
                    res.status(200).json({success : true, user : loggedUser, message : "Login success"});
                }else{
                    res.status(400).json({success : false, message: "Password is incorrect"});
                }
            }
        })
    }catch(err){
        throw err;
    }
}


//         var username = request.body.username;
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

export const postGoogleJoin = async (req, res) => {
    try{

    }catch(err){

    }
}





// export const postLogin = async (req, res) => {
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

export const postChangePassword = async (req, res) => {

    try{
        const user = await User.findOne({email : req.body.email});

        if(req.body.password === req.body.newpassword){
            res.status(400).json({success: false, message: "new password is same"});
        }
        else if(!(await bcrypt.compare(req.body.password, user.password))){
            res.status(400).json({success: false, message: "wrong password"});
        }else{
                const password = await bcrypt.hash(req.body.newpassword, 10);
                const user = await User.findOneAndUpdate({ email: req.body.email }, { password});
                res.status(200).json({success : true, user : user,  message : "successfully password was changed"});
        }

    }catch(error){
        res.status(400).json({err : err});
    }
}









// using passportjs

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

