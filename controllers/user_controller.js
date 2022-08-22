const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(req,user){
            if(user){
               return res.render('user_profile',
               {title:'profile',
               user:user
            });

            }
       return res.redirect('/users/sign-in');
        });

    }else{
        return res.redirect('/users/sign-in');
    }

   // return res.render('user_profile',{title:'profile'});
}
module.exports.work=function(req,res){
    res.end('<h1>user work</h1>');
}
//render sign up page
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{title:'Codeial | Sign up'});
}
//render sign in page
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{title:'Codeial | Sign in'});
}
//get sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in sign up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user in sign up');
                    return;
                } 
                return res.redirect('/users/sign-in');
            })
           
        } else{
            return res.redirect('back');
        }
    })

}
//sign in and create session for user
module.exports.createsession=function(req,res){
    //find the user
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in sign in');
            return;
        }
         //handle user found
         if(user){
            //handle password if not match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');


         }else{
            //handle user not found
            return res.redirect('back');

         }

    });   

}