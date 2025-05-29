import { Product } from "../entities/Products";

export interface ProductRepository {

    create(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findByNameOrCategory(query: string): Promise<Product[]>;

}