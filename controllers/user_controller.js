const User=require('../models/user');
const path=require('path');
const fs=require('fs');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('user_profile',{
            title:'profile',
            profile_user:user
    
    
    });

    });  
}
//for update in profile page
module.exports.update= async function(req,res){
    // to check if any other person change pasram is in html so for athenticate
    if(req.user.id==req.params.id){
        try{
            let user=await  User.findByIdAndUpdate(req.params.id);
            //
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log(' ****multer error',err);
                }
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                //if avatar is already present delete it
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }



                    //this is saving the path of the uploaded file into avatar field in user
                    user.avatar=path.join(User.avatarPath,req.file.filename);
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
         }
        // User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        //   return res.redirect('back');
        // });
    }else{
        req.flash('error','unauthorized');
        return res.status(401).send('unauthorized');
    }
}




module.exports.work=function(req,res){
    res.end('<h1>user work</h1>');
}
//render sign up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{title:'Codeial | Sign up'});
}
//render sign in page
module.exports.signin=function(req,res){
    //if the person sign in redirect to profile page and dont not open sign in page
    if(req.isAuthenticated()){
        console.log('sign in');
        res.redirect('/users/profile');
    }
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
    req.flash('success','logged in successfully');
    return res.redirect('/');

}

//
module.exports.destroySession=function(req,res){
    //logout fun given by passport
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You are logged out');
        res.redirect('/');
      });
      

}