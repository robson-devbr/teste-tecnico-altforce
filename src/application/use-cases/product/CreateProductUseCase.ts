import { CreateProductDTOs } from "../../dtos/product-dtos/CreateProductDTOs";
import { ProductRepository } from "../../../domain/repository/ProductRepository";
import { Product } from "../../../domain/entities/Products";
import crypto from "crypto";

export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async execute(data: CreateProductDTOs): Promise<void> {
        const product = new Product(
            crypto.randomUUID(),
            data.name,
            data.description,
            data.price,
            data.category,
            new Date(),
            new Date(),
        );
        await this.productRepository.create(product);
    }
}
