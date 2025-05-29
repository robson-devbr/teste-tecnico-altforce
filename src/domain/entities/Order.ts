import { OrderStatus } from "../enum/OrderStatus";
import { OrderItem } from "./OrderItem";

export class Order {
    [x: string]: any;
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public items: OrderItem[],
        public status: OrderStatus,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}