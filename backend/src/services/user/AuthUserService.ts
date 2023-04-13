import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verifica se o email já existe no banco de dados
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        const token = sign(
            {
                // informações dentro do token
                name: user.name,
                email: user.email
            },
            // chave global em variável de ambiente
            process.env.JWT_SECRET,
            {
                //options
                subject: user.id,
                expiresIn: '30d'     
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };