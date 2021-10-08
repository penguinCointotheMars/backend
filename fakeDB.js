import faker from 'faker';
import User from './src/models/User';
import Photo from './src/models/Photo';


import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoose.connect(process.env.MONGO_URL_PROD,
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//   }
// );

mongoose.connect(process.env.MONGO_URL_PROD, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

var randomName = faker.name.findName();
var randomEmail = faker.internet.email();
var randomTitle = faker.random.word();
var randomDescription = faker.random.words();
var randomLatt = 34.5 + Math.random();
var randomLong = 34.5 + Math.random();
var randomImg = faker.image.image();
const password = '123';


const fakeUser = async () => {
    randomName = faker.name.findName();
    randomEmail = faker.internet.email();
    
    const user = await User.create({
        username: randomName,
        email: randomEmail,
        password: password,
    });

    return user;
}


const fakeImage = async(req, res) => {
    randomTitle = faker.random.word();
    randomDescription = faker.random.words();
    randomLatt = 35 + Math.random();
    randomLong = 35 + Math.random();
    randomImg = faker.image.image();
}


var round = 0;

for(var i = 0 ; i <= 10 ; i++){

    const user = fakeUser().then(async(user) =>  {
        
        round++;
        console.log(`${round} user joined`);

        randomTitle = faker.random.word();
        randomDescription = faker.random.words();
        randomLatt = 35 + (Math.random()) * 2;
        randomLong = 35 + (Math.random()) * 2;
        randomImg = faker.image.imageUrl();

        const newPhoto = await Photo.create({
            imageURL: randomImg,
            thumbnailURL: randomImg,
            title : randomTitle,
            description : randomDescription,
            GPS : {
                type: "Point",
                coordinates: [randomLatt, randomLong]
            },
            creator: user.id
            })
            user.photos.push(newPhoto.id);
            user.save();

        });
}


// export const postUpload = async(req, res) => {
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