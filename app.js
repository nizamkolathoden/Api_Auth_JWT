const express = require("express");

const app = express();

require('dotenv').config()

const {verifyAcessToken} = require("./helper/Jwt_helper")

//DB
require('./helper/Db_init')()

const port = process.env.Port||4000;
app.use(express.json())
app.use("/",require('./routes/Auth'))

app.get("/pro",verifyAcessToken,(req,res)=>{
    res.json('protected');
    console.log(req.payload)
})

app.listen(port,()=>console.log(`server running on port ${port}`));
