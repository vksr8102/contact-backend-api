const asyncHandler = require("express-async-handler")
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
//@desc register the user
//@route POST api/user/register
//@acess public

const registerUser = asyncHandler(async(req,res,next)=>{
    const {username,email,password}= req.body;
    if(!username || !email ||!password){
res.status(400);
throw new Error ("All fildes are requried")
    }
    //check email is already exist or not
    let existingUser= await User.findOne({email})
    if(existingUser){
        res.status(400)
        throw new Error (`Email ${email} Already Exist`)
    }
    // encrypt the password
    const hashPassword = await bcrypt.hash(password,10)
    console.log(hashPassword);
    //create a new user object and save it to database
    const user=await User.create ({
        username,
        password:hashPassword,
        email
        })
       if(user){
        res.status(201).json({_id:user.id,email:user.email})
       }else{
        res.status(400)
        throw new Error("user already exist")
       }
    
})
//@desclogin  the user
//@route POST api/user/login
//@acess public
const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
    res.status(400)
    throw new Error('all fields required')
   }
   // check for user in db
   const user=await User.findOne({email});
   if (!user ) {
    res.status(401)
    return next (new Error ('Invalid Email Or Password'))
    };
    //verifying passowrd
    if(user&& await bcrypt.compare(password,user.password)){
        const accessToken = JWT.sign({
            user:{
                username:user.username,
                email:user.email,
                id : user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRATE,
           { expiresIn:"15m"}
            )
        res.status(201).json({accessToken})
    }else{
        res.status(401);
        throw new Error ("invalid password or email");
    }
    
    
})
//@desc find the current user
//@route POST api/user/current
//@acess protected
const currentUser=asyncHandler(async(req,res,next)=>{
    res.json(req.user)
})

module.exports ={registerUser,loginUser,currentUser}