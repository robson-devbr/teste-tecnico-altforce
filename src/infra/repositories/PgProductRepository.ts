import { Pool } from "pg";
import { ProductRepository } from "../../domain/repository/ProductRepository";
import { Product } from "../../domain/entities/Products";

export class PgProductRepository implements ProductRepository {
    constructor(
        private readonly pool: Pool
    ) { }

    async create(product: Product): Promise<void> {
        await this.pool.query(
            `
        INSERT INTO products (id, name, description, price, category, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            product.id,
            product.name,
            product.description,
            product.price,
            product.category,
            product.createdAt,
            product.updatedAt,
        ]
        );
    }

    async update(product: Product): Promise<void> {
        await this.pool.query(
            `
            UPDATE products
            SET name = $1, description = $2, price = $3, category = $4, updated_at = $5
            WHERE id = $6
            `,
            [
                product.name,
                product.description,
                product.price,
                product.category,
                product.updatedAt,
                product.id,
            ]
        );
    }

    async delete(id: string): Promise<void> {
        await this.pool.query(
            `DELETE FROM products WHERE id = $1`,
            [id]
        );
    }

    async findById(id: string): Promise<Product | null> {
        const result = await this.pool.query(
            `SELECT * FROM products WHERE id = $1`,
            [id]
        );
        const row = result.rows[0];
        if (!row) return null;
        return new Product(
            row.id,
            row.name,
            row.description,
            row.price,
            row.category,
            row.created_at,
            row.updated_at
        );
    }

    async findAll(): Promise<Product[]> {
        const result = await this.pool.query(
            `SELECT * FROM products ORDER BY created_at DESC`
        );

        return result.rows.map((row) => new Product(
            row.id,
            row.name,
            row.description,
            row.price,
            row.category,
            row.created_at,
            row.updated_at
        ));
    }

    async findByNameOrCategory(query: string): Promise<Product[]> {
        const result = await this.pool.query(
            `
        SELECT * FROM products 
        WHERE name ILIKE $1 OR category::text ILIKE $1
        ORDER BY created_at DESC
        `,
            [`%${query}%`]
        );

        return result.rows.map((row) => new Product(
            row.id,
            row.name,
            row.description,
            row.price,
            row.category,
            row.created_at,
            row.updated_at
        ));
    }

}
