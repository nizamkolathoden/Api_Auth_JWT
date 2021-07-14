const express = require("express");

const app = express();

require('dotenv').config()

const port = process.env.Port||4000;

app.listen(port,()=>console.log(`server running on port ${port}`));