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
export const getFeedPosts= async (req, res)=>{
    try{
        const posts= await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getUserPosts= async (req, res)=>{
    try{
        const { userId }= req.params;
        const posts= await Post.find({ userId });
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// Update
export const likePost= async (req, res)=>{
    try{
        const { id }= req.params;
        const { userId }= req.body;
        const post= await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost= await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes},
            { new : true }
        );
        res.status(200).json(updatedPost);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}