const Comment=require('../models/comment');
const Post=require('../models/post');
const { post } = require('../routes');

module.exports.create=function(req,res){
    //we find the post from post id  1st then create a comment after it
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){{
                if(err){
                    console.log('error in creating the comment');
                    return;
                }
                // adding comment to the post model comment section
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            }});
        }
    });


}
//deleting a comment
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            //we need to go inside the post and find the comment and delete it
            //fing the post id in comment
            let postId=comment.post;
            comment.remove();
            //now update the post
            //and pull out the comment from that post
            Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            });

        }else{
            return res.redirect('back');
        }
    });
}