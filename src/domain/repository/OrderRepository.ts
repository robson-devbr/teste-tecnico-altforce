import { Order } from "../entities/Order";

export interface OrderRepository {
    create(order: Order): Promise<void>;
    findById(id: string): Promise<Order | null>;
    findAllByUser(userId: string): Promise<Order[]>;
    updateStatus(id: string, status: string): Promise<void>;

}
