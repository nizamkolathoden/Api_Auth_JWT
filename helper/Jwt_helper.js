const jwt = require("jsonwebtoken");

const client = require('./redis_init')

module.exports = {

    signAcessToken:(userId)=>{
            return new Promise((resolve,reject)=>{
                
                const payload = {
                    aud:userId
                } 

                const options = {
                    issuer:"nizamkolathoden.live",
                    expiresIn:"30s"
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
    },

    verifyAcessToken:(req,res,next)=>{
        
        const secret = process.env.Acess_Token_Secret 

        const authHeader = req.headers['authorization'];

        if(!authHeader) 
        return res.status(401).json({error:"Un Authrized User"});

        const bearerToken = authHeader.split(' ');

        const token = bearerToken[1];

        jwt.verify(token,secret,(err,payload)=>{

            if(err){
                
                const message = err.name === 'JsonWebTokenError'?'UnAuthrized User':err.message

                return res.json({error:message})

            }

            req.payload = payload

            next()
        })
        
    },

    signRefreshToken:(userId)=>{
        
        return new Promise((resolve,reject)=>{
            
            const payload = {
                aud:userId
            } 

            const options = {
                issuer:"nizamkolathoden.live",
                expiresIn:"30d"
            }

            const secert = process.env.Refresh_Token_Secret

            jwt.sign(payload,secert,options,(err,token)=>{
                
                if(err){
                    console.log(err.message);
                    reject(err)
                }
                const key = userId.toString()
                    client.SET(key,token,'EX',30*24*60*60,(err,reply)=>{
                        
                        if(err){
                            console.log(err.message);
                            return res.status(500).json({error:"Internal Server Error"})
                        }
                    })
                resolve(token)
            })
        })
    },
    verifyRefreshToken:(refershToken)=>{

        const secret = process.env.Refresh_Token_Secret

        return new Promise((resolve,reject)=>{

            jwt.verify(refershToken,secret,(err,payload)=>{

                const userId = payload.aud;
                
                client.GET(userId,(err,result)=>{
                    
                    if(err){
                        console.log(err.message);
                        return res.status(500).json({error:"Internal Server Error"})
                    }
                    if(result===refershToken) 
                    return resolve(userId)

                    reject({message:"Un Autherized User",code:401})
                })
                
                if(err){
                    
                    console.log(err.message);
                    reject({message:'Un Authrized User',code:401});

                }
                

            })
        })

    }

}
