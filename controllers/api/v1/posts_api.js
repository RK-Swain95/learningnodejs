const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index= async function(req,res){

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });  



    return res.json(200,{
        message:"lists os posts",
        posts:posts
    })
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
          return res.json(200,{
             message:"post and associated comments deleted successfully !!"
            });
    }else{
       return res.json(401,{
        message:'u cant delete this post'
       });
    }
    }catch(err){
        
        return res.json(500,{
            message:"Internal server error !!"
        });

    }
   
}