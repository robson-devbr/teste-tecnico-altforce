import { Product } from "../../../domain/entities/Products";
import { ProductRepository } from "../../../domain/repository/ProductRepository";
import { UpdateProductDTOs } from "../../dtos/product-dtos/UpdateProductDTOs";

export class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async execute(data: UpdateProductDTOs): Promise<void> {

        const existingProduct = await this.productRepository.findById(data.id);

        if (!existingProduct) {
            throw new Error("Produto não encontrado!");
        }

        const updateProduct = new Product(
            data.id,
            data.name,
            data.description,
            data.price,
            data.category,
            existingProduct.createdAt,
            new Date()
        );
        await this.productRepository.update(updateProduct);
    }
}