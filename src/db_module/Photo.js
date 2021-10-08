import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    
  imageURL: {
    type: String,
    required: "image URL is required"
  },
  thumbnailURL: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Tilte is required"
  },
  description: {
    type: String,
  },
  GPS: {
    type: { type: String },
    coordinates: [],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
});


PhotoSchema.index({GPS:"2dsphere"});


const model = mongoose.model("Photo", PhotoSchema); 
export default model;


