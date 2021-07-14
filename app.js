const express = require("express");

const app = express();

require('dotenv').config()

//DB
require('./helper/Db_init')()

const port = process.env.Port||4000;
app.use(express.json())
app.use("/",require('./routes/Auth'))

app.listen(port,()=>console.log(`server running on port ${port}`));