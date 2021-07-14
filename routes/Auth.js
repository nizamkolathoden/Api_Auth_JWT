const router = require('express').Router();
const User = require('../model/auth')


router.post("/signup", async (req,res)=>{
    
    const {email,password} = req.body
    
    if(!email||!password) return res.json({error:"enter all fields"})

    const existingUser = await User.findOne({email})
    
    if(existingUser) return res.json({error:"User already exisit"})

    const newUser = await User({
        email,
        password
    }).save()

    console.log(newUser)
})


module.exports = router;