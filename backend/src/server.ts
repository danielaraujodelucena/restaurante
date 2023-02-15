import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors'; 
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json'; 

/* 
    foi criado um arquivo separado para as rotas, apesar
    de que elas são criadas utilizando também o express
*/
import { router } from './routes';


/*
    - o backend é acionado via request (através de uma rota)
    - quem trata as requests/responses é o express
    - o express está na const app
*/
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))    
)

/*
    - toda request é processada nesse arquivo
    - toda request executará o middleware abaixo
    - o middleware abaixo é uma função de tratamento de erros
    - a função next() não é do NodeJs e nem da API Express
    - o middleware abaixo é o manipulador de erros padrão da API Express
    - cuida de quaisquer erros que possam ser encontrados no aplicativo
*/

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})


// cria o servidor, mas essa criação deve ser sempre na última linha
app.listen(3333, () => console.log('Servidor online')); 