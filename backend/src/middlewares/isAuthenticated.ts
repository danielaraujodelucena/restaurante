import { NextFunction, Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

/* 
    - sabemos que a função abaixo é um middleware por causa da utilização do parâmetro next
    - middleware é bastante utilizado no fluxo de autenticação
*/
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    const[, token] = authToken.split(" ");

    try {
        // validar token
        // sub = id do usuário
        const{ sub } = verify(token, process.env.JWT_SECRET) as Payload;
        req.user_id = sub;
        
        // se não utilizar o next(), a requisição ficará presa no middleware
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}