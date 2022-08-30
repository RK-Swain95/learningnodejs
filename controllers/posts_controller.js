const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,posts){
        if(err){
            console.log('error in creating the post');
            return;
        }
        return res.redirect('back');
    })
}
module.exports.destroy=function(req,res){
    //before deleting find it exits in data base or not
    Post.findById(req.params.id,function(err,post){
        //check wheather you deleting a post its posted by u only not other post
        //.id meansconverting object id into string
        if(post.user==req.user.id){
            post.remove();
        //to delete comments
        Comment.deleteMany({post:req.params.id},function(err){
            return res.redirect('back');
        });
    }else{
        return res.redirect('back');
    }

    });
}