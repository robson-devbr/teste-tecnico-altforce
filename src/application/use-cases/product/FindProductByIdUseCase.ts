import { FindProductsByIdDTOs } from "../../dtos/product-dtos/FindProductByIdDTOs";
import { Product } from "../../../domain/entities/Products";
import { ProductRepository } from "../../../domain/repository/ProductRepository";

export class FindProductByIdUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async execute(data: FindProductsByIdDTOs): Promise<Product | null> {
        const product = await this.productRepository.findById(data.id);
        return product;
    }
}
