import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";


export async function verificarAdmin(request: Request, response: Response, next: NextFunction){
//verificar se o usuário é ademe

    const { user_id } = request

    const usersRepository = getCustomRepository(UsersRepositories)

    const { admin } = await usersRepository.findOne(user_id)

    if(admin){
        return next();
    }

    //else
    return response.status(401).json({ 
        erro: "Você não tem permissão para essa ação"
    })
    
}