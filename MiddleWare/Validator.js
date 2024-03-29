const { check, validationResult } = require("express-validator");




exports.registerValidation=()=>[
    check('name','this field is required').notEmpty(),
    check('email','this field must be am email').isEmail(),
    check('password',"this field should be 6 caracters min").isLength({min:6}).isStrongPassword()
]

exports.Validator=(req,res,next)=>{
    const error=validationResult(req)
    error.isEmpty()?next():res.status(400).send(error.array())
}
