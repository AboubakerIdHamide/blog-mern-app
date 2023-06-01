import User from "../models/User.js";

// Read
export const getUser = async (req, res)=>{
    try{
        const { id }= req.params;
        const user = await User.findById(id);
        if(!user) return res.status(401).json({ msg:"User does not exist." });
        res.status(200).json(user);

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getUserFriends= async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(401).json({ msg:"User does not exist." });

        const friends= await Promise.all(
            user.friends.map( uId => User.findById(uId))
        );
        const formattedFriends=friends.map((friend)=>{
            return {
                _id: friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                occupation: friend.occupation,
                location: friend.location,
                picturePath: friend.picturePath,
            }
        });
        res.status(200).json({ friends: formattedFriends });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// Update
export const addRemoveFriends = async (req, res)=>{
    try{
        const { id, friendId }= req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        if(!user) return res.status(401).json({ msg:"User does not exist." });
        if(!friend) return res.status(401).json({ msg:"User Friend does not exist." });

        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter(uId => uId!==friendId);
            friend.friends=friend.friends.filter(fId => fId!==id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends= await Promise.all(
            user.friends.map( uId => User.findById(uId))
        );

        const formattedFriends=friends.map((friend)=>{
            return {
                _id: friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                occupation: friend.occupation,
                location: friend.location,
                picturePath: friend.picturePath,
            }
        });
        res.status(200).json({ friends: formattedFriends });

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}