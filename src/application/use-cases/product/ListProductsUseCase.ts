import { Product } from "../../../domain/entities/Products";
import { ProductRepository } from "../../../domain/repository/ProductRepository";
import { ListProductDTOs } from "../../dtos/product-dtos/ListProductDTOs";

export class ListProductsUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async execute(filters?: ListProductDTOs): Promise<Product[]> {

        if (filters?.name || filters?.category) {
            const query = filters.name || filters.category!;
            return await this.productRepository.findByNameOrCategory(query);
        }

        return await this.productRepository.findAll();
    }

}