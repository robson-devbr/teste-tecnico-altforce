import { SuggestCategoryResponseDTO } from "../dtos/ai-dtos/SuggestCategoryResponseDTO";

export interface AIClassifierService {
    classifyProductDescription(description: string): Promise<SuggestCategoryResponseDTO>;
}
