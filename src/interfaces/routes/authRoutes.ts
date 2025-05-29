import { Router } from "express";

import { RegisterController } from "../http/controllers/auth/registerController";
import { RegisterUserUseCase } from "../../application/use-cases/user/RegisterUserUseCase";

import { LoginController } from "../http/controllers/auth/loginController";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";

import { PgUserRepository } from "../../infra/repositories/PgUserRepository";
import { pool } from "../../config/pool";

const authRoutes = Router();

// Repositório compartilhado
const repo = new PgUserRepository(pool);

// Casos de uso
const registerUserUseCase = new RegisterUserUseCase(repo);
const loginUserUseCase = new LoginUserUseCase(repo);

// Controllers
const registerController = new RegisterController(registerUserUseCase);
const loginController = new LoginController(loginUserUseCase);

// Rotas
authRoutes.post('/register', async (req, res) => {
    await registerController.register(req, res);
});

authRoutes.post('/login', async (req, res) => {
    await loginController.login(req, res);
});

console.log('🟢 auth routes Ok');

export default authRoutes;
