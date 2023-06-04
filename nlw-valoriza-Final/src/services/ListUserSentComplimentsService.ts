import { getCustomRepository } from "typeorm"
import { ElogiosRepositories } from "../repositories/ElogiosRepositories"



class ListSentElogiosService{
    
    async execute(user_id: string){
        
        const elogiosRepositories = getCustomRepository(ElogiosRepositories)
        
        const elogios = await elogiosRepositories.find({
            where: {
                user_sender: user_id
            }
        })

        return elogios    

    }
}



export { ListSentElogiosService }