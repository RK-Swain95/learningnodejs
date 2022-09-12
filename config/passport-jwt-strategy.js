const passport=require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;


const User=require('../models/user');

var opts = {

    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    //decrypted code
    secretOrKey :'codeial'
}

passport.use(new JwtStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log('error in finding the user from jwt'); return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
    
}));


module.exports=passport;