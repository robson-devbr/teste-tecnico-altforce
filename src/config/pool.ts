import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect()
    .then((result) => console.log("🟢 Conectado ao banco de dados!"))
    .catch((err) => console.error("🔴 Erro ao conectar ao banco de dados.", err));

    