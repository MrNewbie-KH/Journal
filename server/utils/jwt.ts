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
    const token = jwt.sign(payload,"f73e0b92a27a2486e70b0bf06fc45ed1a26ae15a5ae594006a590b0f5ec47bb8cb5ce7013043721d55134ae658af20c2d979efb44d9dc2e66e8187ff7ed3c02c")
return token
}
export {
    payloadOfJWT,
    createJWTAccessToken
}