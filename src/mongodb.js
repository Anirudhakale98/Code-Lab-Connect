const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CodeLab')
.then(()=>{
    console.log('mongoDB connected');
}). catch(()=>{
    console.log('mongoDB is not connected')
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginSchema = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required : true,
    }
})

const collection = new mongoose.model("User", LoginSchema)

module.exports = collection

