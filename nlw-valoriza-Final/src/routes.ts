import {Router} from "express"

import {CreateUserController} from "./controllers/CreateUserController";
import {CreateTagController} from './controllers/CreateTagController';
import { verificarAdmin } from "./middlewares/verificarAdmin";
import { verificarAutenticacao } from "./middlewares/verificarAutenticacao";
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateElogioController} from './controllers/CreateElogioController';
import { ListReceivedElogiosController } from "./controllers/ListReceivedElogioController";
import { ListSentElogiosController} from './controllers/ListSentElogioController'

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createElogioController = new CreateElogioController();

const listSentElogiosController = new ListSentElogiosController()
const listReceivedElogiosService = new ListReceivedElogiosController()


router.post("/users", createUserController.handle);
router.post('/tags', verificarAutenticacao, verificarAdmin, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post("/elogios", verificarAutenticacao, createElogioController.handle)

router.get('/users/elogios/enviados', verificarAutenticacao, listSentElogiosController.handle)
router.get('/users/elogios/recebidos', verificarAutenticacao, listReceivedElogiosService.handle)

export { router }