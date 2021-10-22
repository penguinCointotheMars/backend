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
            if(err) res.status(400).json({err : err});

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
        res.status(400).json({err : err});
    }
}

export const postJoin = async (req, res) => {

    const { email, password, name, birthDate, address, phoneNumber, userType, description } = req.body;
    
    try{
        // To do : 1) 포토는 따로 S3 연결하는 함수 생성해서 req에서 받아옴 
        //         2) id Verification : 따로 함수 생성 
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            email : email,
            password : hashedPassword,
            name : name,
            birth_date : birthDate,
            address : address,
            phone_number : phoneNumber,
            user_type : userType,
            description : description
        };

        let newUserId = nanoid();
        db.query('SELECT * FROM user_credential WHERE email = ?', email, function(err, result) {
            if(err) res.status(400).json({err : err});
            
            if(result.length > 0) res.status(400).json({success: false, message : "You are already registered"});
            else{
                db.query('SELECT 1 FROM user_credential WHERE user_id = ?', newUserId, function(err, results) { 
                    if(err) res.status(400).json({err : err});
                    if(results.length > 0) newUserId = nanoid();
                
                })
                user['user_id'] = newUserId;

                db.query('INSERT INTO user_credential SET ?', user, function(err){
                    if(err) res.status(400).json({err : err});
                    else{
                        const loggedUser = {
                            email : email,
                            user_id : newUserId
                        }
                        res.status(200).json({success : true, message : "You are successfully registered",  user : loggedUser});
                        // insertId add as asending 
                    }
                })}
            });
        }
        catch(err){
            res.status(400).json({err : err})
        }
    }

export const postLogin = async (req, res) => {
    
    const { email, password } = req.body;

    try{
        db.query('SELECT * FROM user_credential WHERE email = ?', email, async function(err, result){
            console.log(result);
            if (err) res.status(400).json({err : err})

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
        res.status(400).json({err : err})
    }
}

// export const postGoogleJoin = async (req, res) => {
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

export const postEditProfile = async (req, res) => {

    const { 
        body : {user_id, email, address, phoneNumber, userType, description},
        file : {location}
    } = req;
    console.log(user_id, email);

    try{
        db.query('SELECT * FROM user_credential WHERE user_id = ? AND email = ?', [user_id, email], function(err, result){
            if(err) res.status(400).json({err : err});

            if(result.length > 1) {
                res.status(400).json({ 
                    success : false, 
                    message : "😨😨😨😨 user_id is duplicated! Please check DB!"
                })
            }
            else{
                const userUpdate = {
                    address : address, 
                    phone_number : phoneNumber,
                    user_type : userType,
                    description : description,
                    profile_url : location
                }

                db.query("UPDATE user_credential SET ? WHERE user_id = ?", [userUpdate, result[0].user_id], function (err, results) {
                    if(err) res.status(400).json({success : false, err : err});
                    else{
                        res.status(200).json({ success : true, user : userUpdate, message : "😉 user profile update is completed!"});
                    }
                })
            }
        })
    }catch(err){
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

