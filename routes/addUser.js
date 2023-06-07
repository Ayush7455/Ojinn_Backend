const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")

require("dotenv").config()

router.post("/addUser",(req,res)=>{
    const {email}=req.body
    if(!email){
        return res.status(422).json({error:"Required fields are missing"})
    }
    else{
        User.find({email:email}).then(async(savedUser)=>{
            if(savedUser?.length > 0){
                return res.status(422).json({error:"User is already registered"})
            }
            else{
                const user=new User({
                    email
                })
                try {
                    await user.save();
                    return res.status(200).json({ message: "User Saved Successfully"});
        
                }
                catch (err) {
                    console.log(err);
                    return res.status(422).json({ error: "Error while saving" });
                }
            }
        })
       
    }

})
module.exports=router