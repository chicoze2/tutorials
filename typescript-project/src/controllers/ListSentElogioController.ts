import {Request, Response} from "express"
import {ListReceivedElogiosService} from '../services/ListUserReceivedComplimentsService'


class ListSentElogiosController{

    async handle(request: Request, response: Response){
        const { user_id } = request

        const listUserReceivedComplimentsService = new ListReceivedElogiosService()

        const elogios =  await listUserReceivedComplimentsService.execute(user_id)
    
        return response.json(elogios)
    
    }
}


export {ListSentElogiosController}