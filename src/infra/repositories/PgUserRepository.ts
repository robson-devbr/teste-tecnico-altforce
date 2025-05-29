import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { Pool } from 'pg';

export class PgUserRepository implements UserRepository {
    constructor(
        public readonly pool: Pool
    ) { }

    async FindByEmail(email: string): Promise<User | null> {
        const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return new User(row.id, row.name, row.email, row.password, row.role);
    }

    async create(user: User): Promise<void> {
        await this.pool.query(
            `INSERT INTO users (id, name, email, password, role)
             VALUES ($1, $2, $3, $4, $5)`,
            [user.id, user.name, user.email, user.password, user.role]
        );
    }

}
