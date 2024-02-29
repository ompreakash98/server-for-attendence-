
// require("")
const express=require('express');
const app=express()
const cors= require('cors');
const adminRoot=require('./router/admin-router')
const router=require("./router/auth-router");
const imagerouter=require('./router/image-route')
const attendenceRouter=require('./router/attendenc-Router')
const  connectionDb=require('./utils/db');
app.use(express.json());
app.use(cors())
app.use("/api/auth",router)
app.use("/api/employee",attendenceRouter)
app.use('/api/image',imagerouter)

// defiene Admin root
app.use("/api/admin",adminRoot)

const PORT=5000

connectionDb().then(()=>{

    app.listen(PORT,()=>{
        console.log(`APP RUNING AT POR ${PORT}`)
    });
});