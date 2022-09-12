const express = require('express');
const router = express.Router();
const passport=require('passport');
const postApi=require("../../../controllers/api/v1/posts_api");

router.get('/',postApi.index);
//authentication check over passport
//session false to prevent generate session cookie
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);
module.exports=router;