const passport=require("passport");

const LocalStrategy=require("passport-local").Strategy; 
const User=require('../models/user');

//aunthentication
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
},
function(req,email,password,done){//done call back function
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding the user --> passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('ivalid username/password');
            return done(null,false);
        }
        return done(null, user);


    });


}

));

//serializing to user to decide which key is to be kept in the cookies
//id send it to the cookie and cookie send it to the browser
passport.serializeUser(function(user,done){
    done(null,user.id)
});


//deserializing the user from the key in the cookies
//browser make a request and we deserialize it 
//picking the id from serial cookie and find the user from database
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user --> passport');
            return done(err);
        }
        return done(null,user);

    });
});

//check the user is aunthenticate
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        // console.log('middleware');
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
//to access authenticate user in views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the section cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;

}
next();
}

//export
module.exports=passport;