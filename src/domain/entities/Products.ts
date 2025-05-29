import { ProductCategory } from "../enum/ProductCategory";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public category: ProductCategory,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
