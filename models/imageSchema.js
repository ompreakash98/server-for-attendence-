const mongoose=require('mongoose')

const imageSchema=mongoose.Schema({
    email:String,
    date:String,
    imagePath:String,
})

const Image=mongoose.model('Image',imageSchema);

module.exports=Image