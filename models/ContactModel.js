const mongoose = require("mongoose")
const ContactSchema = mongoose.Schema({
    user_id:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:"user"

    },
    name: {
        type: String,
        required: [true,'please add the contact name'] 
        },
        email:{type :String,
            match:[/\S+@\S+\.\S+/,"Please enter a valid Email"],
            required:[true,"please add the conact email"]
        },
        phone:{
            type: String,
        required: [true,'please add the contact Number']   
        }

},{
    timestamps: true // to include created_at and updated_at fields in our schema
}
)
module.exports =mongoose.model("contact",ContactSchema);