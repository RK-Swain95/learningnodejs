const mongoose = require('mongoose');
const router = require('../routes');
const { route } = require('../routes');


const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comments belongs to a user
    user:{
        //type is a reference..whenever post is created it is linked to the user, so its refered to the user schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'

     }

},{
    timestamps:true
});



const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;