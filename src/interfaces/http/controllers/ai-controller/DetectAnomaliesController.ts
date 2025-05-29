import type { Request, Response } from "express";
import { DetectAnomaliesUseCase } from "../../../../application/use-cases/ai-cases/DetectAnomaliesUseCase";
import { CohereAIClassifierService } from "../../../../infra/external/cohere/CohereAIClassifierService";
import { PgProductRepository } from "../../../../infra/repositories/PgProductRepository";
import { pool } from "../../../../config/pool";

export class DetectAnomaliesController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const productRepo = new PgProductRepository(pool);
      const aiService = new CohereAIClassifierService();

      const useCase = new DetectAnomaliesUseCase(productRepo, aiService);
      const result = await useCase.execute();

      res.status(200).json({ analysis: result });
    } catch (error) {
      console.error("[DetectAnomaliesController] Error:", error);
      res.status(500).json({ error: "Erro ao detectar anomalias." });
    }
  }
}