import type { Request, Response } from "express";
import { SuggestProductCategoryUseCase } from "../../../../application/use-cases/ai-cases/SuggestProductCategoryUseCase";
import { CohereAIClassifierService } from "../../../../infra/external/cohere/CohereAIClassifierService";

export class AIController {

  private userCase: SuggestProductCategoryUseCase;

  constructor() {
    const classifierService = new CohereAIClassifierService();
    this.userCase = new SuggestProductCategoryUseCase(classifierService);
  }

  async suggestCategory(req: Request, res: Response): Promise<void> {
    try {
      const { description } = req.body;

      if (!description || typeof description !== 'string') {
        res.status(400).json({error: "Descrição inválida!"});
        return;
      }

      const result = await this.userCase.execute(description);
      res.json(result);

    } catch (error) {
      console.error("Erro ao sugerir categoria:", error);
      res.status(500).json({ error: "Erro ao sugerir categoria." });
    }
  }
}
