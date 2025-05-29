import type { Request, Response } from "express";
import { RegisterUserUseCase } from "../../../../application/use-cases/user/RegisterUserUseCase";

// registerusercase => infra
export class RegisterController {
    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase
    ) { }

   async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const user = await this.registerUserUseCase.execute({ name, email, password });
            return res.status(201).json({ id: user.id, email: user.email });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

}