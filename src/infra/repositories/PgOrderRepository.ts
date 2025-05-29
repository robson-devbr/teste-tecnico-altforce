import { OrderRepository } from "../../domain/repository/OrderRepository";
import { Order } from "../../domain/entities/Order";
import { Pool } from "pg";
import { OrderItem } from "../../domain/entities/OrderItem";
import { OrderStatus } from "../../domain/enum/OrderStatus";

export class PgOrderRepository implements OrderRepository {

    constructor(
        private readonly pool: Pool
    ) { }

    async create(order: Order): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            await client.query(
                `
            INSERT INTO orders (id, user_id, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            `, [order.id, order.userId, order.status, order.createdAt, order.updatedAt]
            );

            for (const item of order.items) {
                await client.query(`
                INSERT INTO order_items (id, order_id, product_id, quantity)
                VALUES ($1, $2, $3, $4)
            `, [item.id, item.orderId, item.productId, item.quantity]);
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Erro ao criar pedido:", error);
            throw new Error("Erro ao criar o pedido");
        } finally {
            client.release();
        }
    }

    async findAllByUser(userId: string): Promise<Order[]> {
        const orderResult = await this.pool.query(
            "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        const orders: Order[] = [];

        for (const orderRow of orderResult.rows) {
            const orderItemResult = await this.pool.query(
                "SELECT * FROM order_items WHERE order_id = $1",
                [orderRow.id]
            );

            const items: OrderItem[] = orderItemResult.rows.map(row => new OrderItem(
                row.id,
                row.order_id,
                row.product_id,
                row.quantity
            ));

            const order = new Order(
                orderRow.id,
                orderRow.user_id,
                items,
                orderRow.status as OrderStatus,
                orderRow.created_at,
                orderRow.updated_at
            );

            orders.push(order);
        }

        return orders;
    }

    async findById(id: string): Promise<Order | null> {
        const orderResult = await this.pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [id]
        );

        if (orderResult.rows.length === 0) return null;

        const order = orderResult.rows[0];

        const itemsResult = await this.pool.query(
            "SELECT * FROM order_items WHERE order_id = $1",
            [id]
        );

        return {
            id: order.id,
            userId: order.user_id,
            status: order.status,
            createdAt: order.created_at,
            updatedAt: order.updated_at,
            items: itemsResult.rows.map((item: any) => ({
                id: item.id,
                orderId: item.order_id,
                productId: item.product_id,
                quantity: item.quantity,
            })),
        };

    }

    async updateStatus(id: string, status: string): Promise<void> {
        await this.pool.query(
            "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2",
            [status, id]
        );
    }

}
