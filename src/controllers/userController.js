import User from  '../models/User';
// import passport from "passport";
import bcrypt from "bcrypt";
// import app from '../app';

export const getUsers = async (req, res) =>{
    const users = await User.find({}).sort({ _id: -1 });
    res.status(200).json({users : users});
}

export const postJoin = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(user !== null){
            res.status(400).json({success: false, message : "You are already registered"});
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            res.status(200).json({success: true, user : user, message: "Your account has been saved"});
        }
    }catch(err){
        res.status(400).json({err : err});
    }
}

export const postLogin = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(user === null){
            res.status(400).json({success: false, message : "email is incorrect"});
        }else{
            if(await bcrypt.compare(req.body.password, user.password)){
                const loggedUser = {
                    email : user.email,
                    _id : user._id,
                    photos : user.photos,
                    comments : user.comments, 
                    username: user.username ? user.username : "",
                }
                res.status(200).json({success: true, user : loggedUser, message : "Login success"});
            }else{
                res.status(400).json({success: false, message : "password is incorrect"});
            }
        }
    }catch(error){
        res.status(400).json({err : err});
    }
}

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

