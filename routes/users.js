const express=require('express');
const router = express.Router();

const passport=require('passport');



const userController=require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/work',userController.work);


router.get('/sign-up',userController.signup);
router.get('/sign-in',userController.signin);

router.post('/create',userController.create);


//use passport as a middle ware to aunthenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createsession);

router.get('/sign-out',userController.destroySession);


module.exports=router;