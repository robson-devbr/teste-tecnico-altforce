import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class CancelOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async execute(orderId: string, userId: string): Promise<void> {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error("Pedido não encontrado.");
        }

        if (order.userId !== userId) {
            throw new Error("Você não tem permissão para cancelar este pedido.");
        }

        if (order.status === "CANCELLED") {
            throw new Error("O pedido já foi cancelado.");
        }

        await this.orderRepository.updateStatus(orderId, "CANCELED");
    }

}
