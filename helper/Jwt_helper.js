const jwt = require("jsonwebtoken");

module.exports = {

    signAcessToken:(userId)=>{
            return new Promise((resolve,reject)=>{
                
                const payload = {
                    aud:userId
                } 

                const options = {
                    issuer:"nizamkolathoden.live",
                    expiresIn:"1h"
                }

                const secret = process.env.Acess_Token_Secret

                jwt.sign(payload,secret,options,(err,token)=>{
                    if(err){
                        console.log(err.message);
                        reject(err)
                    }
                   resolve(token)
                })
            })
    }
}
