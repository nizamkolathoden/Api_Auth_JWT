const mongoose = require("mongoose")

const DB = () => {
    try {
        mongoose.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify:false
             
        }, () => console.log('connected to DB'))

    } catch (err) {
        console.log(err.message)
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = DB