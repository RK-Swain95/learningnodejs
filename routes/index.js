const express = require('express');
const router = express.Router();

//console.log('running');
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'));


module.exports=router;