const mongoose = require("mongoose")

const connectDB = async()=>{
try {
    const connect=await mongoose.connect(process.env.DB_URL)
    console.log(`MongoDB connected: ${connect.connection.host},${connect.connection.name}`)
} catch (error) {
    console.log(error);
    process.exit(1); //to exit the node application if there is any error while connecting to MongoDB
}
}

module.exports = connectDB;