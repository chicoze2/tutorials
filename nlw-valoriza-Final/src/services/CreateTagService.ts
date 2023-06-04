import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


class CreateTagService{

    async execute(name: string) { // vai receber sí o name pq o id vai ser gerado pelo construtor e os dates são gerados no entity ou migrations

        const tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new Error("Nome incorreto");
        }

        

        const tagAlreadyExists = await tagsRepositories.findOne({ name})

        if(tagAlreadyExists){
            throw new Error("Tag already exists!")
        }
        //else 
        const tag = tagsRepositories.create({ name })
        
        await tagsRepositories.save(tag)

        return tag
    }

}

export {CreateTagService}