import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UsersRepositories} from '../repositories/UserRepositories'
import { sign } from 'jsonwebtoken' ///sign é a propriedade para gerar o token

interface IAuthenticateRequest{
    email: string,
    password: string
}


class AuthenticateUserService {

    async execute({email, password} : IAuthenticateRequest) {
        
        const usersRepositories = getCustomRepository(UsersRepositories)

        //verificar se existe o email cadastrado (essa é uma função de auth e nao de criação)

        const user = await usersRepositories.findOne({email})
        if(!user){
            throw new Error("Email/Senha incorrect")
        }


        //verificar se a senha está correta

        const passCorrect = await compare(password, user.password) //comparar a senha passada pelo usuario com a senha salva no banco
        if(!passCorrect){
            throw new Error("Email/Senha incorrect")
        }
    
        
        //gerar token 
        const token = sign({email: user.email},

                           "bff7d510cc76c4feac630b70e52d8c6a", //hash md5 de segurança
                           
                           {subject: user.id,
                            expiresIn: "1d"} //tempo de expiração em 1 dia
                          )

        return token

    }

}

export { AuthenticateUserService}