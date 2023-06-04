import { UsersRepositories } from "../repositories/UserRepositories"
import {getCustomRepository} from "typeorm"; 
import { hash } from 'bcryptjs'

 
interface IUserRequest{
    name : string;
    email : string;
    admin?: boolean;
    password: string;

}

class CreateUserService{

    async execute({name, email, admin, password}) {
        const usersRepository =  getCustomRepository(UsersRepositories);

        if(!email){ //verificar se foi passado um email
            throw new Error("Email incorreto")
        }

        if(!admin){
            admin = false
        }

        const passwordHash = await hash(password, 8)

        const userAlreadyExists = await usersRepository.findOne({ //pesquisar se já existe esse email cadastrado no banco de dados
            email
        });

        if(userAlreadyExists){  // Verificar se o ususario já existe
            throw new Error("User already exists");
        }

        const user = usersRepository.create({ //criar usuario
            name,
            email,
            admin,
            password : passwordHash //declara a variavel password como sendo passwordHash
        })

        await usersRepository.save(user); //commitar

        return user; 
    }
}

export {CreateUserService}
