import "reflect-metadata";
import Express, {Request, Response, NextFunction} from "express";
import "express-async-errors"
import { router } from './routes';
import "./database"; //importar o index do DB



const app = Express(); // no projeto antigo, o express era chamdo de server

app.use(Express.json()) // configura o express para ler respose JSON
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {// o primeiro parametro verifica se há um erro, req, res, next funtion é tipo um callback depois da tratativa do erro
    if(err instanceof Error) { //if erro é uma instancia de erro (se o erro foi chamado pelo throw new Error ou é um erro do server)
        console.log('erorrr')
        return response.status(400).json({ //define o erro como status 400 e envia um json de resposta
            err: err.message, //message definida no Throw new Error
        })
    }

    return response.status(500).json({
        status : "erro na execução de uma função não rastreada",
        message: "Internal Server Error"
    })
}) 



app.listen(3000, () => console.log("Server running"))