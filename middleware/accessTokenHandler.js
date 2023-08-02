const asyncHandler = require("express-async-handler")

const JWT = require("jsonwebtoken")


const validateToken = asyncHandler(async(req,res,next)=>{
    var token;
    const authHeader = req.headers.Authorization ||req.headers.authorization 
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(" ")[1];
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRATE,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not autherized");
            }
            req.user = decoded.user;
            next();
        })
    } 
    if(!token){
        return  res.status(403).send({message:"No Token Provided"})
    }  
})

module.exports = validateToken;