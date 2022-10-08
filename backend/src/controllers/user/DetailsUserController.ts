import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/DetailsUserService";

class DetailsUserController {
    async handle(req: Request, resp: Response) {
        const detailsUserService = new DetailsUserService();

        const user = await detailsUserService.execute();

        return resp.json(user);
    }
}

export { DetailsUserController };