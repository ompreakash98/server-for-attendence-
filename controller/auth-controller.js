
const { Employee } = require('../models/employee-model')

const bcrypt = require('bcryptjs')
const { trace } = require('../router/auth-router')
const home = async (req, res) => {
    try {

        res.status(200).send("hello from server home page router")

    } catch (error) {
        console.log(error)
    }
}

const registrer = async (req, res) => {
    try {

        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExits = await Employee.findOne({ email: email })
        if (userExits) {
            return res.status(400).json({ massage: "email already exists" })
        }
        // hash the password
        // const saltround=10;
        // const hash_password= await bcrypt.hash(password,saltround)
        const AllEmployee = await Employee.create({ username, email, phone, password })
        res.status(200).json({ massage: "Registration sucessFully", token: await AllEmployee.generateToken(), userId: AllEmployee._id.toString() })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExits = await Employee.findOne({ email });
        if (!userExits) {
            return res.status(400).json({ massage: "invalid credential" })
        }
        // const user =await bcrypt.compare(password,userExits.password)
        const user = await userExits.comparePassword(password)
        if (user) {
            
            res.status(200).json({ massage: "Login sucessFully", token: await userExits.generateToken(), userId: userExits._id.toString() })

        } else {
            res.status(401).json({ massage: "invalid email or password" })
        }
    } catch (error) {
        console.log(error)

    }

}

//user logic to send user data

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({ userData })
    } catch (error) {
        console.log(`error from user roote ${error}`)

    }
}


module.exports = { home, registrer, login, user }