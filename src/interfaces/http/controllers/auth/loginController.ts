import type { Request, Response } from "express";
import { LoginUserUseCase } from "../../../../application/use-cases/user/LoginUserUseCase";

export class LoginController {
    constructor(
        private readonly loginUserUseCase: LoginUserUseCase
    ) { }

    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const token = await this.loginUserUseCase.execute({ email, password });
            return res.status(200).json({ token });
        } catch (err: any) {
            return res.status(401).json({ error: err.message });
        }
    }
}
