import { EntityRepository, Repository} from "typeorm"
import { User} from "../entities/User"; 
 
@EntityRepository(User)
class UsersRepositories extends Repository<User>{ // a classe foi extendida para receber as funções da classe Repository

}

export {UsersRepositories}