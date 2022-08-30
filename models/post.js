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

    },
    // include array of ids of all comments in this post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]


},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;