const passport=require("passport");

const LocalStrategy=require("passport-local").Strategy; 
const User=require('../models/user');

//aunthentication
passport.use(new LocalStrategy({
    //how to detect who is the user from user schema
    usernameField:'email',
    passReqToCallback: true
},
function(req,email,password,done){//done call back function
    //find a user and establish the identity
    //2nd email is the vaule which passed on to fing email(1st) in user schema
    User.findOne({email:email},function(err,user){
        if(err){
           req.flash('error',err);
            return done(err);
        }
        //2nd password is the value which passed on in fun
        if(!user || user.password!=password){
        req.flash('error','ivalid username/password');
        //error is nul here so we write null and authentication is false here
            return done(null,false);
        }
        return done(null, user);


    });


}

));

//serializing to user to decide which key is to be kept in the cookies
//id send it to the cookie and cookie send it to the browser
passport.serializeUser(function(user,done){
    //set user id as a cookie
    done(null,user.id)
});


//deserializing the user from the key in the cookies
//browser make a request and we deserialize it 
//picking the id from serial cookie and find the user from database
passport.deserializeUser(function(id,done){
    //find the user exits in database or not
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user --> passport');
            return done(err);
        }
        return done(null,user);

    });
});
//send the data of current user to views


//check the user is sign in or not
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        // console.log('middleware');
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
//if user is sign in ,to access authenticate user in views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the section cookie and we are just sending this to the locals for the views
        //to access user in views in sign in
        res.locals.user=req.user;

}
next();
}

//export
module.exports=passport;