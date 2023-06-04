import express, {request, response} from "express"
import { CreateUserService } from "../services/CreateUserService"

class CreateUserController{
    
    async handle(request: express.Request, response: express.Response) {

        const { name, email, admin, password } = request.body; //recebe as informações do server

        const createUserService = new CreateUserService();
    
        const user = await createUserService.execute({name, email, admin, password})
    
        return response.json(user) //repassa as infos para o controller

    }
}

export {CreateUserController} ; 