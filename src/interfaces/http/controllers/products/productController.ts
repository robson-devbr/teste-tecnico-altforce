import type { Request, Response } from "express";
import { CreateProductUseCase } from "../../../../application/use-cases/product/CreateProductUseCase";
import { DeleteProductUseCase } from "../../../../application/use-cases/product/DeleteProductUseCase";
import { UpdateProductUseCase } from "../../../../application/use-cases/product/UpdateProductUseCase";
import { ListProductsUseCase } from "../../../../application/use-cases/product/ListProductsUseCase";
import { FindProductByIdUseCase } from "../../../../application/use-cases/product/FindProductByIdUseCase";

export class ProductController {
    constructor(
        private readonly createdProductUseCase: CreateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly listProductsUseCase: ListProductsUseCase,
        private readonly findProductByIdUseCase: FindProductByIdUseCase
    ) { }

    async create(req: Request, res: Response): Promise<Response> {
        const { name, description, price, category } = req.body;

        try {
            await this.createdProductUseCase.execute({ name, description, price, category });
            return res.status(201).json({ message: "Produto criado!" });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        try {
            await this.updateProductUseCase.execute({ id, name, description, price, category });
            return res.status(200).json({ message: "Produto atualizado com sucesso!" })
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            await this.deleteProductUseCase.execute({ id });
            return res.status(200).json({ message: "Produto deletado com sucesso!" })
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        const { name, category } = req.query;

        try {
            const products = await this.listProductsUseCase.execute({
                name: name?.toString(),
                category: category?.toString() as any,
            });
            return res.status(200).json(products);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const product = await this.findProductByIdUseCase.execute({ id });

            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            return res.status(200).json(product);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

}
