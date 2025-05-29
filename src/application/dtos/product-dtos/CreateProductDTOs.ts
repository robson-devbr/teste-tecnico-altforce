import { ProductCategory } from "../../../domain/enum/ProductCategory";

export interface CreateProductDTOs {
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
}
