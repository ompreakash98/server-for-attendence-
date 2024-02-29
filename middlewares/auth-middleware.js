const jwt=require('jsonwebtoken');
const Employee=require('../models/employee-model')
const {JWT_SECRET_KEY}=require('../models/employee-model')

const authmiddileware=async(req,res,next)=>{
  const token=req.header("Authorization");
  if(!token){
    return res.status(401).json({massage:"Unauthorized HTTP, Token not provided"})
  }

  
  const jwtToken=token.replace('Bearer',"").trim()
  console.log('tokent from auth middleware',jwtToken);
  try {
    const isVerified=jwt.verify(jwtToken,JWT_SECRET_KEY)
    // const userData= await Employee.findOne({email:isVerified.email});
    // console.log(userData)
    req.user=isVerified;
    req.token=token;

    next()
  } catch (error) {
    
  }
  
}

module.exports=authmiddileware;