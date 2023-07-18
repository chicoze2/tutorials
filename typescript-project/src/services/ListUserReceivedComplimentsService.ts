import { getCustomRepository } from "typeorm"
import { ElogiosRepositories } from "../repositories/ElogiosRepositories"



class ListReceivedElogiosService{
    
    async execute(user_id: string){
        
        const elogiosRepositories = getCustomRepository(ElogiosRepositories)
        
        const elogios = await elogiosRepositories.find({
            where: {
                user_receiver: user_id
            }
        })

        return elogios    

    }
}



export { ListReceivedElogiosService }