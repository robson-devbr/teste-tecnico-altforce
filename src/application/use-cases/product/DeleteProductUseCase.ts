import { DeleteProductDTOs } from "../../dtos/product-dtos/DeleteProductDTOs";
import { ProductRepository } from "../../../domain/repository/ProductRepository";

export class DeleteProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async execute(data: DeleteProductDTOs): Promise<void> {

        const product = await this.productRepository.findById(data.id);

        if (!product) {
            throw new Error("Produto não encontrado!");
        }

        await this.productRepository.delete(data.id);
    }
}