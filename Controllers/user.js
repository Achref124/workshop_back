const user = require("../Models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

//register
exports.register=async (req,res)=>{
    try {
        const {name,lastName,email,password,age,photo,phone}=req.body
        const foundUser= await user.findOne({email})
        if(foundUser){
            res.status(400).send({msg:"email already exists!"})
        }else{
            const salt=10
            const hashedPassword= await bcrypt.hash(password,salt)
            const newUser= new user (req.body)
            newUser.password=hashedPassword
            await newUser.save()
            const token=jwt.sign({
                id:newUser._id
            },process.env.SECRET_KEY)
            res.status(200).send({msg:"user added successfully",newUser,token})
        }
    } catch (error) {
        res.status(500).send({msg:"error on register",error})
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const foundUser= await user.findOne({email})
        if(!foundUser){
            res.status(400).send({msg:"email or password does not exist"})
        }else{
            const check= await bcrypt.compare(password,foundUser.password)
            if(!check){
                res.status(400).send({msg:"email or password does not exist"})
            }else{
                const token=jwt.sign({
                    id:foundUser._id
                },process.env.SECRET_KEY)
                res.status(200).send({msg:"logged in successfully",foundUser,token})
            }
        }
    } catch (error) {
        res.status(500).send({msg:"error on login",error})
    }
}

exports.changePassword=async(req,res)=>{
    try {
        const {_id}=req.params
        const {password}=req.body
        
        const salt=10
            const hashedPassword= await bcrypt.hash(password,salt)
            await user.updateOne({_id},{$set:{password:hashedPassword}})
            res.status(200).send({msg:"password updated successfully!"})
    } catch (error) {
        res.status(500).send({msg:"error on changing password",error})
    }
}
