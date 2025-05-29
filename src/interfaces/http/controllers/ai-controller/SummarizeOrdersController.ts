import type { Request, Response } from "express";
import { SummarizeOrdersUseCase } from "../../../../application/use-cases/ai-cases/SummarizeOrdersUseCase";
import { PgProductRepository } from "../../../../infra/repositories/PgProductRepository";
import { CohereAIClassifierService } from "../../../../infra/external/cohere/CohereAIClassifierService";
import { pool } from "../../../../config/pool";

export class SummarizeOrdersController {
    private useCase: SummarizeOrdersUseCase;

    constructor() {
        const pgProductRepository = new PgProductRepository(pool);
        const aiService = new CohereAIClassifierService();
        this.useCase = new SummarizeOrdersUseCase(pgProductRepository, aiService);
    }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.query.userId as string | undefined;

            const summary = await this.useCase.execute(userId ?? '');

            res.setHeader('Content-Type', 'text/plain');
            res.send(summary);
        } catch (error) {
            console.error('Erro no SummarizeOrdersController:', error);
            res.status(500).json({ error: 'Erro ao gerar resumo dos pedidos' });
        }
    }
}
