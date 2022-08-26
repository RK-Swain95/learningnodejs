const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //link it to user 
    user:{
        //type is a reference..whenever post is created it is linked to the user, so its refered to the user schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }


},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;