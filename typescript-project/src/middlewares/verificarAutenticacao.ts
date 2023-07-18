import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}


export function verificarAutenticacao(request: Request, response:Response, next: NextFunction){
    const userToken = request.headers.authorization
    
    if(!userToken){
        return response.status(401).json({"message": "Missing auth token"})
    }

    const [,token] = userToken.split(" ") //separa o token a partir do espaço (Bearer: asdge01.6gf3f.asdf1)e pega o segundo elemento do array

    try{     
        const {sub} = verify(token, 'bff7d510cc76c4feac630b70e52d8c6a') as IPayload
        
        request.user_id = sub 
    }
    
    catch (err){
        return response.status(401).end()
    } 

    return next()
}