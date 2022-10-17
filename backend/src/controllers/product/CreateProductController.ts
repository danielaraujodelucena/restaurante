import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const createProductService = new CreateProductService();

        if(!req.file) {
            throw new Error("error upload file")
        } else {
            const { filename: banner } = req.file;

            console.log("name: ", name);
            console.log("price: ", price);
            console.log("description: ", description);
            console.log("banner: ", banner);
            console.log("category_id: ", category_id);

            const product = await createProductService.execute({ 
                name, 
                price, 
                description, 
                banner, 
                category_id 
            });
    
            return res.json(product);
        }

    }
}

export { CreateProductController }