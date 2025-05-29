import type { Request, Response } from "express";
import { GenerateProductDescriptionUseCase } from "../../../../application/use-cases/ai-cases/GenerateProductDescriptionUseCase";
import { CohereAIClassifierService } from "../../../../infra/external/cohere/CohereAIClassifierService";

export class GenerateProductDescriptionController {
    private useCase: GenerateProductDescriptionUseCase;

    constructor() {
        const aiService = new CohereAIClassifierService();
        this.useCase = new GenerateProductDescriptionUseCase(aiService);
    }

    async handle(req: Request, res: Response): Promise<void> {
        const { name, category } = req.body;

        if (!name || !category) {
            res.status(400).json({ error: "Nome e categoria são obrigatórios." });
        }

        try {
            const description = await this.useCase.execute({ name, category });
            res.json({ description });
        } catch (error) {
            res.status(500).json({ error: "Erro ao gerar descrição automática." });
        }
    }
}