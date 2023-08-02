const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required : [true,"Please add the username"]
    },
    email:{
        type:String,
        unique:[true,'Email already exists'],
        required : [true,"Please enter the email"]
    },
    password:{
        type:String,
        minlength:6,
        trim: true,
        required: [true, "Password is Required"],
    }
},
{
    timestamps: true  
})

module.exports = mongoose.model("user",UserSchema)