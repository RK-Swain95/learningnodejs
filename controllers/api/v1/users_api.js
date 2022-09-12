const User=require('../../../models/user');
//for json web token
const jwt=require('jsonwebtoken');





module.exports.createsession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
         //if user is not found 
         if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid user name and password !!"
            });
         }
         //if user is found
         return res.json(200,{
            message:"sign in successfully keeep the token safe !!",
            //generating the token
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        });
    }catch(err){
        return res.json(500,{
            message:"Internal server error !!"
        });
    }

   

}