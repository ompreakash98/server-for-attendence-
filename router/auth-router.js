const express=require('express')
const router=express.Router();
const{home,registrer,login,user}=require('../controller/auth-controller')
const authmiddileware =require("../middlewares/auth-middleware")

router.route('/').get(home);

router.route('/register').post(registrer);
router.route('/login').post(login)

router.route('/user').get(authmiddileware,user)



module.exports=router;