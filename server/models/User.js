import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:2,
        max:50
    }
});