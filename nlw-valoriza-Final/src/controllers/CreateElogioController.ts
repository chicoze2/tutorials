 import {Request, Response} from 'express'
 import {CreateElogioService} from '../services/CreateComplimentService'


 class CreateElogioController {

    async handle(request: Request, response: Response){
        const { tag_id, user_receiver, message} = request.body
        const {user_id} = request

        const createElogioService = new CreateElogioService();

        const elogio = await createElogioService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        })

        return response.json(elogio)
    }

 }

 export {CreateElogioController}