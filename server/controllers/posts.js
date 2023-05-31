import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
export const createPost = async (req, res)=>{
    try{
        const {userId, description, picturePath } = req.body;
        const user= await User.findById(userId);
        const newPost= new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });

        await newPost.save();

        const posts= await Post.find();
        res.status(201).json(posts);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// Read
export const getFeedPosts= async ()=>{
    try{
        const posts= await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getUserPosts= async (req, res)=>{

}