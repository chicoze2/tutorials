import {Request, Response} from "express"
import { Elogio } from "../entities/Elogios"
import {ListSentElogiosService} from '../services/ListUserSentComplimentsService'


class ListReceivedElogiosController{

    async handle(request: Request, response: Response){
        const { user_id } = request

        const listUserSendComplimentsService = new ListSentElogiosService()

        const elogios =  await listUserSendComplimentsService.execute(user_id)
        
        return response.json(elogios)
        
    }

}


export {ListReceivedElogiosController}