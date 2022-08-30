const express = require('express');
const router = express.Router();

//console.log('running');
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comments',require('./comments'));
module.exports=router;