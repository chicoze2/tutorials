import { getCustomRepository } from "typeorm";
import {ElogiosRepositories} from "../repositories/ElogiosRepositories"
import {UsersRepositories} from "../repositories/UserRepositories"

interface IElogiosrequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateElogioService {

    async execute( {tag_id, user_sender, user_receiver, message} : IElogiosrequest) {
        const elogiosRepository = getCustomRepository(ElogiosRepositories)
        const usersRepository = getCustomRepository(UsersRepositories)

        const userReceiverExists = await usersRepository.findOne(user_receiver)

        if(!userReceiverExists){
            throw new Error("O usuário a ser elogiado não existe!")
        }

        if (user_sender == user_receiver){
            throw new Error("Você não pode enviar um elogio para si mesmo")
            
        }
        //else

        const elogio = elogiosRepository.create({tag_id, user_sender, user_receiver, message})

        await elogiosRepository.save(elogio)

        return elogio
    }
}

export { CreateElogioService }