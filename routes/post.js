const express=require('express');
const router = express.Router();
const passport=require('passport');

const postController=require('../controllers/posts_controller');
//no one other than who signed in write a post so that we need a check that ius passport authentication
//if somrone tries to create post on html and if he is not authenticate unable to post
router.post('/create',passport.checkAuthentication,postController.create);
//to delete the post
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);



module.exports=router;