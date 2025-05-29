import { ProductCategory } from "../../../domain/enum/ProductCategory";

export interface UpdateProductDTOs {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
}
