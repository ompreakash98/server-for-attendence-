const express =require('express');
const{hellofromattenedence,checkIn,checkOut,getAllAtendence,veyfyattendence}=require('../controller/attendenseController')
const router=express.Router();

router.route('/attendence').get(hellofromattenedence);

router.route('/checkin').post(checkIn);
router.route('/checkOut').patch(checkOut);

router.route('/allAtendence/:email').get(getAllAtendence);
router.route('/veryfyAttendence/:email/:date').get(veyfyattendence);



module.exports=router