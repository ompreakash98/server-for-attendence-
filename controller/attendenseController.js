const Attendance=require('../models/attendanceSchema')

const hellofromattenedence=async (req,res)=>{
    try {
       
            res.status(200).send("hello from server home page router")
        
    } catch (error) {
        console.log(error)
    }
}
// const checkIn =async (req,res)=>{
//     try {
          
//         console.log(req.body);
//         const {email,date,checkintime,checkOutTime}=req.body;

//         // const Attendance=require('../models/attendanceSchema')
//         // const EmployeeAttendence= await Attendance.create({email,date,checkintime,checkOutTime})
//         // res.status(200).json({massage:"checkin sucessFully",token: await AllEmployee.generateToken(),userId:AllEmployee._id.toString()})
//     //    res.status(200) .json({massage:"check in sucessfull",data:EmployeeAttendence})
//     res.status(200).send("hello from check in router for attendence ")

//     } catch (error) {
//         console.log(error)
//     }
// }

const checkIn= async(req,res)=>{
    try {
        const { employeeEmail, allAttendance } = req.body;     
        // Validate that employeeEmail is provided
        if (!employeeEmail) {
          return res.status(400).json({ error: "Employee email is required." });
        }
    
        // Check if there is an existing attendance entry for the provided date
        const existingAttendance = await Attendance.findOne({ employeeEmail, 'allAttendance.date': allAttendance[0].date });
    
        if (existingAttendance) {
          // If an entry for the date exists, update it
          await Attendance.updateOne(
            { employeeEmail, 'allAttendance.date': allAttendance[0].date },
            { $set: { 'allAttendance.$.checkIn': allAttendance[0].checkIn } }
          );
          res.json({ message: 'Attendance record updated successfully.' });
        } else {
          // If no entry for the date exists, create a new entry
          const attendance = new Attendance({ employeeEmail, allAttendance });
          await attendance.save();
          res.status(201).json(attendance);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    

    }
    const checkOut= async (req, res) => {
      try {
        const { employeeEmail, allAttendance } = req.body;
    
        // Validate that employeeEmail is provided
        if (!employeeEmail) {
          return res.status(400).json({ error: "Employee email is required." });
        }
    
        // Check if there is an existing attendance entry for the provided date
        const existingAttendance = await Attendance.findOne({ employeeEmail, 'allAttendance.date': allAttendance[0].date });
    
        if (existingAttendance) {
          // If an entry for the date exists, update it
          await Attendance.updateOne(
            { employeeEmail, 'allAttendance.date': allAttendance[0].date },
            { $set: {'allAttendance.$.checkOut': allAttendance[0].checkOut ,'allAttendance.$.checkOut': allAttendance[0].checkOut } }
          );
          res.json({ message: 'Attendance record updated successfully.' });
        } else {
          // If no entry for the date exists, create a new entry
          const attendance = new Attendance({ employeeEmail, allAttendance });
          await attendance.save();
          res.status(201).json(attendance);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }


    const getAllAtendence=async (req, res) => {
      try {
        const email = req.params.email;
        const attendanceData = await Attendance.find({ employeeEmail: email });
        console.log(attendanceData)
        res.status(200).json(attendanceData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }


    const veyfyattendence= async (req,res)=>{
      try {
        const{ email,date }= req.params;
        const existingAttendance = await Attendance.findOne({
          employeeEmail:email,
          'allAttendance.date':date,
          'allAttendance.checkIn': { $ne: '' } // Check if check-in is not empty
      });    if(existingAttendance){
          res.json(true);
        }
        else{
          res.json(false);
    
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
    }




module.exports={hellofromattenedence,checkIn,checkOut,getAllAtendence,veyfyattendence}