const User=require("../models/User");
const jwt=require("jsonwebtoken");
const expressjwt=require("express-jwt");
require('dotenv').config();
exports.signup=(req,res)=>{
   const user=new User(req.body);
   user.save((err,user)=>{
       if(err){
           return res.status(400).json({err:err})
       }
       res.status(402).json({id:user._id,name:user.name,email:user.email})
   })
}

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(!user){
            return res.status(400).json({
                err:"User email doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email password does not match"
            })
        }
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        res.cookie("token",token,{expire:new Date()+9999});

        
    return res.status(200).json({msg:"User signed in successfully"})
    })

}
exports.signout=(req,res)=>{
    res.clearCookie("token");
res.json({
    msg:"User Sign Out Successfully"
})
}
