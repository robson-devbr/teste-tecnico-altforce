import type { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../../application/use-cases/order-cases/CreateOrderUseCase";
import { ListOrderUseCase } from "../../../../application/use-cases/order-cases/ListOrdersUseCase";
import { GetOrderByIdUseCase } from "../../../../application/use-cases/order-cases/GetOrderByIdUseCase";
import { CancelOrderUseCase } from "../../../../application/use-cases/order-cases/CancelOrderUseCase";

export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly listOrderUseCase: ListOrderUseCase,
        private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
        private readonly cancelOrderUseCase: CancelOrderUseCase
    ) { }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req.user as any)?.id;

            if (!userId) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }

            const { items } = req.body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: "Itens do pedido são obrigatórios" });
            }

            await this.createOrderUseCase.execute({
                userId,
                items,
            });

            return res.status(201).json({ message: "Pedido criado com sucesso!" });

        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req.user as any)?.id;

            if (!userId) {
                return res.status(401).json({ message: "Usuário não autenticado." })
            }

            const orders = await this.listOrderUseCase.execute(userId);

            return res.status(200).json(orders);

        } catch (error) {
            console.error("Erro ao listar pedidos:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req.user as any)?.id;
            const { id } = req.params;

            if (!userId) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }

            const order = await this.getOrderByIdUseCase.execute(id, userId);

            if (!order) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            return res.status(200).json(order);
        } catch (error) {
            console.error("Erro ao buscar pedido:", error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async cancel(req: Request, res: Response): Promise<Response> {
        try {
            const userId = (req.user as any)?.id;
            const { id } = req.params;

            if (!userId) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }

            await this.cancelOrderUseCase.execute(id, userId);

            return res.status(200).json({ message: "Pedido cancelado com sucesso!" });

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

}