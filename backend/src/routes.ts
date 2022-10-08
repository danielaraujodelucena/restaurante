import { Router } from "express";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";

const router = Router();

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', new DetailsUserController().handle)

export { router };