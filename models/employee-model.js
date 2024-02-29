const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET_KEY="FSDFDSFSDFHJSDKFSDKFHSDJKFHSDFDSHGDFG"
const employeeSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
//define the collection name

//secure password
employeeSchema.pre('save',async function (){

    const employee=this; 

    if(!employee.isModified("password")){
        next()
    }

    try {
        const saltround=10;
        const hash_password= await bcrypt.hash(employee.password,saltround)
        employee.password=hash_password
        // const AllEmployee= await Employee.create({username,email,phone,password:hash_password})
    } catch (error) {
        
    }

})

//compare password 

employeeSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}





employeeSchema.methods.generateToken=  async function(){
try {
    return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin
    },
    JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    }
    ) 
} catch (error) {
    console.log(error);
}
}

const Employee=new mongoose.model("Employee",employeeSchema)

module.exports={Employee,JWT_SECRET_KEY};