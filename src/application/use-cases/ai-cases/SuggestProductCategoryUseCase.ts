import { CohereAIClassifierService } from "../../../infra/external/cohere/CohereAIClassifierService";
import { SuggestCategoryResponseDTO } from "../../dtos/ai-dtos/SuggestCategoryResponseDTO";

export class SuggestProductCategoryUseCase {
    constructor(
        private classifierService: CohereAIClassifierService
    ) { }

    async execute(description: string): Promise<SuggestCategoryResponseDTO> {
        const classification = await this.classifierService.classify(description);
        return classification;
    }
}
