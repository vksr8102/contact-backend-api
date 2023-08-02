const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler =require("./middleware/errorHandler")
const connectDB = require("./config/dbConnection")
const app = express()
const port = process.env.PORT || 5000

connectDB();
app.use(express.json())//-->use for the pase the data

app.use('/api/contacts',require("./routes/contactRoutes"))
app.use('/api/user',require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})