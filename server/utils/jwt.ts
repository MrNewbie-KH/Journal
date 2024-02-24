import jwt from "jsonwebtoken"
type Payload ={
    id:string,
    email:string
    
}
type User ={
    id:string,
    email:string

}
const payloadOfJWT = function(user:User): Payload{
    
    return {id:user.id,email:user.email}
}

const createJWTAccessToken = function(payload:Payload){
    if(!process.env.ACCESS_TOKEN_SECRET){
        console.log("No secret in the env");
        
        process.exit(1)
    }
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET)
return token
}
export {
    payloadOfJWT,
    createJWTAccessToken
}