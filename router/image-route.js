const express=require('express');
const {uploade}=require('../controller/image-controller')
const router=express.Router();


router.route('/uploade').post(uploade)


module.exports=router;