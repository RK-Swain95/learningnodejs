const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
       let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
   
        //check if the request is an ajax request
        if(req.xhr){
            //return json
            return res.status(200).json({
                data:{
                     post:post
                },
                message:'post created !'
            })
        }


        req.flash('success','post published !')
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
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

         if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },message:'post deleted '
            });
         }

         req.flash('success','post deleted !')

            return res.redirect('back');
    }else{
        req.flash('error','u can not delete !')
        return res.redirect('back');
    }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');

    }
   
}