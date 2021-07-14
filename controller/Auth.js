const User = require('../model/auth')

const bcrypt = require('bcrypt')

module.exports = {
    signup:async (req, res) => {

        const { email, password } = req.body
    
        if (!email || !password) return res.json({ error: "enter all fields" })
    
        const existingUser = await User.findOne({ email })
    
        if (existingUser) return res.json({ error: "User already exisit" })
    
        //salt round
        const saltRound = 10;
    
        bcrypt.genSalt(saltRound, (err, salt) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) {
                    console.log(err.message);
                    return res.status(500).json({ error: "Internal Sever Error" })
                }
                console.log(hashedPassword)
    
                const newUser = await User({
                    email,
                    password: hashedPassword
                }).save()
    
                console.log(newUser)
            })
        })
    
    
    
    }
}