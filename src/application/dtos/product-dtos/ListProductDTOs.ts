import { ProductCategory } from "../../../domain/enum/ProductCategory";

export interface ListProductDTOs {
    name?: string;
    category?: ProductCategory;
}
