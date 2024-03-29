

const express=require("express")
const { register, login, changePassword } = require("../Controllers/user")
const { isAuth } = require("../MiddleWare/isAuth")
const { registerValidation, Validator } = require("../MiddleWare/Validator")

const router=express.Router()
const current=async(req,res)=>{
    try {
        const foundUser=req.user
        res.status(200).send(foundUser)
    } catch (error) {
        res.status(500).send(error)
    }
}


//register
router.post("/register",registerValidation(),Validator,register)
router.post("/login",login)
router.put("/editpassword/:_id",changePassword)

router.get('/current',isAuth,current)

module.exports=router


