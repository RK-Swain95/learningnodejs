const { populate } = require('../models/post');
const Post=require('../models/post');
const { post } = require('../routes');
const User=require('../models/user');



//async await
module.exports.home= async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){

    //     return res.render('home',{
    //         title:'home',
    //         posts:posts
    //     });
    // });
    try{
         //populate the user from user id from posts
   let posts= await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
       path:'comments',
       populate:{
           path:'user'
       }
   });       
  
       // to show all the user in the home page who sign in
      let users= await User.find({});
    return res.render('home',{
       title:'home',
       posts:posts,
       all_users:users
           });

    }catch(err){
        console.log('Error',err);
        return;

    }
   

        }