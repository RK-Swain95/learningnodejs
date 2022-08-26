const User=require('../models/user');

module.exports.profile=function(req,res){

    return res.render('user_profile',{title:'profile'});
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
    return res.redirect('/');

}

//
module.exports.destroySession=function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    

}