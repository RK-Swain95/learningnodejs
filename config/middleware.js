module.exports.setFlash=function(req,res,next){
    //we will just find out the flash from the req and set it up in the locals of the response 
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')

    }
    //for passes to the next middleware
    next();
}