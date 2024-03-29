
const jwt=require("jsonwebtoken")
const user = require("../Models/user")




exports.isAuth=async(req,res,next)=>{
    try {
        
        const token = req.headers['authorization'];
        
        if(!token){
            res.status(400).send({msg:"not authorized"})
        }else{
        const verif=jwt.verify(token,process.env.SECRET_KEY)
        const foundUser=await user.findOne({_id:verif.id})
        if(!foundUser){
            res.status(400).send({msg:"not authorized"})
        }else{
            req.user=foundUser
            next()
        }
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"error on auth",error})
    }
}

