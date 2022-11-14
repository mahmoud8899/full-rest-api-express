
import Jwt from 'jsonwebtoken'

export const  getToken = (id)=>{


    return Jwt.sign({id}, process.env.SCRIPT_TOKEN,{
        expiresIn : '3d'
    })
}

