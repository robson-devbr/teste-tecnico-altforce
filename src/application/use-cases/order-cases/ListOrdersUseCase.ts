import { OrderRepository } from "../../../domain/repository/OrderRepository";
import { ProductRepository } from "../../../domain/repository/ProductRepository";
import { OrderResponseDTO } from "../../dtos/order-dtos/OrderResponseDTO";
import { OrderItemDTO } from "../../dtos/order-dtos/OrderItemDTO";

export class ListOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) { }

    async execute(userId: string): Promise<OrderResponseDTO[]> {
        const orders = await this.orderRepository.findAllByUser(userId);
        const response: OrderResponseDTO[] = [];

        for (const order of orders) {
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

            response.push({
                id: order.id,
                userId: order.userId,
                status: order.status,
                items,
                total,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            });
        }

        return response;
    }
}