const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("auth",authSchema)