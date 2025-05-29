import { Router } from "express";
import { OrderController } from "../http/controllers/orders/OrderController";

import { CreateOrderUseCase } from "../../application/use-cases/order-cases/CreateOrderUseCase";
import { ListOrderUseCase } from "../../application/use-cases/order-cases/ListOrdersUseCase";
import { GetOrderByIdUseCase } from "../../application/use-cases/order-cases/GetOrderByIdUseCase";
import { CancelOrderUseCase } from "../../application/use-cases/order-cases/CancelOrderUseCase";

import { PgOrderRepository } from "../../infra/repositories/PgOrderRepository";
import { PgProductRepository } from "../../infra/repositories/PgProductRepository";

import { pool } from "../../config/pool";
import { authMiddleware } from "../middlewares/authMiddleware";

const orderRoutes = Router();

const orderRepo = new PgOrderRepository(pool);
const productRepo = new PgProductRepository(pool);

const createOrderUseCase = new CreateOrderUseCase(orderRepo);
const listOrderUseCase = new ListOrderUseCase(orderRepo, productRepo);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepo, productRepo);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepo);

const orderController = new OrderController(
    createOrderUseCase,
    listOrderUseCase,
    getOrderByIdUseCase,
    cancelOrderUseCase
);

// Criar Pedido
orderRoutes.post("/orders", authMiddleware, async (req, res) => {
    await orderController.create(req, res);
});

// Listar Pedido
orderRoutes.get("/orders", authMiddleware, async (req, res) => {
    await orderController.list(req, res);
});

// Buscar por id específico
orderRoutes.get("/orders/:id", authMiddleware, async (req, res) => {
    await orderController.getById(req, res);
});

// Cancelar um pedido ou status
orderRoutes.patch("/orders/:id/cancel", authMiddleware, async (req, res) => {
    await orderController.cancel(req, res);
});

console.log('🟢 order routes Ok');

export { orderRoutes };