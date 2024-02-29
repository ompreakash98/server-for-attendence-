const mongoose =require('mongoose');
const attendenceSchema = new mongoose.Schema({
    employeeEmail: { type: String, required: true },
    allAttendance: [{
      date: String,
      checkIn: String,
      checkOut: String,
      latitude:String,
      longitude:String,
      userImage:String
      
    }]
  });

// const AttendanceSchema= new mongoose.Schema({
//     employee: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Employee',
//         required: true
//     },    

//     date: {
//         type: Date,
//         default: Date.now
//     },

// }

// // )
// const getAttendanceByEmail = async (email) => {
//     try {
//         // Find the employee by email
//         const employee = await Employee.findOne({ email: email });

//         if (!employee) {
//             return { error: "Employee not found" };
//         }

//         // Find all attendance records for the employee
//         const attendanceRecords = await Attendance.find({ employee: employee._id });

//         return attendanceRecords;
//     } catch (error) {
//         console.error(error);
//         return { error: "Internal Server Error" };
//     }
// };




const Attendance = mongoose.model('Attendance', attendenceSchema);
module.exports = Attendance