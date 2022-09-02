const { populate } = require('../models/post');
const Post=require('../models/post');
const { post } = require('../routes');
const User=require('../models/user');

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){

    //     return res.render('home',{
    //         title:'home',
    //         posts:posts
    //     });
    // });

    //populate the user from user id from posts
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        // to show all the user in the home page who sign in
        User.find({},function(err,users){
            return res.render('home',{
                title:'home',
                posts:posts,
                all_users:users
            });

        })
      
    })
    
}