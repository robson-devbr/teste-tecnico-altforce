import { PgProductRepository } from "../../../infra/repositories/PgProductRepository";
import { CohereAIClassifierService } from "../../../infra/external/cohere/CohereAIClassifierService";

type Product = {
    name: string;
    price: number;
    category: string;
    created_at?: string;
};

export class SummarizeOrdersUseCase {
    constructor(
        private orderRepository: PgProductRepository,
        private aiService: CohereAIClassifierService
    ) { }

    async execute(userId: string): Promise<string> {
        const products: Product[] = await this.orderRepository.findAll();

        const prompt = `
           Analyze the user's purchase history (user ID: ${userId}) and generate a **summary in markdown format only**, containing:

           1. A section **"Most Purchased Products"** as a markdown table (no HTML, no JSON):
           | Product                            | Price (R$)           | Category            |
           |------------------------------------|----------------------|---------------------|

           2. A section **"Latest Purchased Products"** as a markdown table (same format).

           3. A section **"General Insights"** with patterns, preferences or any relevant observations.

           ⚠️ Do **NOT** use HTML or JSON in the response. Use only clean, readable markdown tables and text.

            Here is the product data to analyze:
            ${JSON.stringify(products, null, 2)}
        `;


        const response = await this.aiService.summarize(prompt);
        return response.trim();
    }
}
