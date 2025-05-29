import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { ProductRepository } from "../../../domain/repository/ProductRepository";
import { OrderResponseDTO } from "../../dtos/order-dtos/OrderResponseDTO";
import { OrderItemDTO } from "../../dtos/order-dtos/OrderItemDTO";


export class GetOrderByIdUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) {}

    async execute(orderId: string, userId: string): Promise<OrderResponseDTO | null> {
        const order = await this.orderRepository.findById(orderId);

        if (!order || order.userId !== userId) {
            return null;
        }

        const items: OrderItemDTO[] = [];

        for (const item of order.items) {
            const product = await this.productRepository.findById(item.productId);
            items.push({
                productId: item.productId,
                name: product?.name ?? "Produto não encontrado",
                price: product?.price ?? 0,
                quantity: item.quantity,
                total: product ? product.price * item.quantity : 0
            });
        }

        const total = items.reduce((sum, i) => sum + i.total, 0);

        return {
            id: order.id,
            userId: order.userId,
            status: order.status,
            items,
            total,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        };
    }
}
//