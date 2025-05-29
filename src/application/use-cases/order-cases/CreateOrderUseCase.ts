import { CreateOrderDTO } from "../../dtos/order-dtos/CreateOrderDTO";
import { Order } from "../../../domain/entities/Order";
import { OrderItem } from "../../../domain/entities/OrderItem";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import crypto from 'crypto';
import { OrderStatus } from "../../../domain/enum/OrderStatus";

export class CreateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    async execute(data: CreateOrderDTO): Promise<void> {
        const orderId = crypto.randomUUID();
        const now = new Date();

        const orderItems: OrderItem[] = data.items.map(item => new OrderItem(
            crypto.randomUUID(),
            orderId,
            item.productId,
            item.quantity
        ));

        const order = new Order(
            orderId,
            data.userId,
            orderItems,
            OrderStatus.PENDING,
            now,
            now
        );

        await this.orderRepository.create(order);
    }
}
