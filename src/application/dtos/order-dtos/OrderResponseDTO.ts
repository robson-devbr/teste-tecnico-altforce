import { OrderStatus } from "../../../domain/enum/OrderStatus";
import { OrderItemDTO } from "./OrderItemDTO";

export interface OrderResponseDTO {
    id: string;
    userId: string;
    status: OrderStatus;
    items: OrderItemDTO[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
