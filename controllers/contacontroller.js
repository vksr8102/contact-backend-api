const asyncHandler =require("express-async-handler")
const ContactModel = require("../models/ContactModel")
//@desc get all contacts
//@route GET api/contacts
//@acess private

 const getContacts = asyncHandler(async(req,res)=>{
    const contact = await ContactModel.find({user_id:req.user.id});
    res.status(200).json(contact)
})
//@desc update contacts
//@route PUT api/contacts/:Id
//@acess private
 const updateContact =asyncHandler(async(req,res)=>{
const contact = await ContactModel.findById(req.params.id);
if(!contact){
    res.status(404)
    throw new Error ('No such contact exist')
}
if(contact.user_id.toString()!==req.user.id){
    res.status(400);
    throw new Error ("Not authorized to perform this action");
}
    const updateContact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    )

    res.status(200).json(updateContact)
})
//@desc create contacts
//@route POST api/contact
//@acess private
 const postContact =asyncHandler(async(req,res)=>{
    console.log("get request from the body is ",req.body);
const {name,email,phone}=req.body;
if(!name ||!email || !phone){
  res.status(400);
  throw new Error('please provide name email and phone number');
}
const contact = await ContactModel.create({
    name,
    email ,
    phone,
    user_id:req.user.id
})
    res.status(201).json(contact)
})
//@desc delete contacts
//@route DELETE api/contacts/:Id
//@acess private
 const deleteContact =asyncHandler(async(req,res)=>{
    const contact = await ContactModel.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error (`no contact found for Id :${req.params.id}`);
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(400);
        throw new Error ("Not authorized to perform this action");
    }
    await ContactModel.deleteOne({_id:req.params.id})
    res.status(200).json(contact)
})
//@desc get contact
//@route GET api/contacts/:Id
//@acess private
 const getContact = asyncHandler(async(req,res,next)=>{
    const contact = await ContactModel.findById(req.params.id)
    if (!contact ){
        res.status(404);
        throw new Error(`No such contact with id: ${req.params.id}`)
    } 
    res.status(200).json(contact)
})

module.exports ={getContacts,postContact,updateContact,deleteContact,getContact}