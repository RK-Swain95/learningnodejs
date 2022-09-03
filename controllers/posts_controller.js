const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('error in creating the post',err);
        return;
    }
   
}
module.exports.destroy= async function(req,res){
    //before deleting find it exits in data base or not
    try{
        let post=await Post.findById(req.params.id);
        //check wheather you deleting a post its posted by u only not other post
        //.id meansconverting object id into string
        if(post.user==req.user.id){
            post.remove();
        //to delete comments
         await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
    }else{
        return res.redirect('back');
    }
    }catch(err){
        console.log('error in deletinging the post',err);
        return;

    }
   
}