import Photo from '../models/Photo';
import User from '../models/User';
import { multerDelete } from "../middlewares";


export const postSearch = async (req, res) => {
    const {
        body:{
            latt, long, distance
        }, 
    } = req;
    
    if(!distance) distance = 1000;

    let photos = [];
    
    try{
        photos = await Photo.find({
            GPS:{
                $near:{
                    $maxDistance: parseFloat(distance),
                    $geometry:{
                        type: "Point",
                        coordinates : [parseFloat(long), parseFloat(latt)]
                    }
                }
            }
        }).sort({_id : -1});

        res.status(200).json({success: true, photos : photos, message: `${photos.length} photos were searched`});

    }catch(error){
        res.status(400).send(error);
    }
};


export const postUpload = async(req, res) => {
    const {
        body: { title, description, email, long, latt},
        file : {location}
    } = req;


    try{
        const uploader = await User.findOne({email});
        const newPhoto = await Photo.create({
            imageURL: location,
            thumbnailURL: location,
            title,
            description,
            GPS : {
                type: "Point",
                coordinates: [parseFloat(long), parseFloat(latt)]
            },
            creator: uploader.id
        })
        uploader.photos.push(newPhoto.id);
        uploader.save();
        res.status(200).json({success: true, photo : newPhoto, message: "photo was uploaded"});
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
}

export const postEditPhoto = async (req, res) => {
    const {
        body : {title, description, _id},
    } = req;

    try{
        const photo = await Photo.findOneAndUpdate({ _id: _id }, { title, description});
        res.status(200).json({success: true, photo : photo, message: "photo was edited"});
    }catch(error){
        res.status(400).send(error);
    }
}

export const uploadTest = async (req, res) => {
    const body = await req.body;
    console.log(body);
    res.json(body);
}

export const postDeletePhoto = async (req, res) =>{
    const { 
        body: {_id}
    } = req;
    
    try{
        const photo = await Photo.findById({_id : _id});
        const filename = photo.imageURL.split("/photos/")[1];
        const params = {
            Bucket: "lsns/photos",
            Key: filename,
            };
        multerDelete(params);
        await Photo.findOneAndDelete({ _id: _id});
        res.status(200).json({success: true, message: "photo was deleted"});
    }
    catch(error){
        console.log(error);
        res.status(400).send(error);
    }
}
