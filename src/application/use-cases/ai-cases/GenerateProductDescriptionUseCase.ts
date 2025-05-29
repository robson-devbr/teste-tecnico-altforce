import { CohereAIClassifierService } from "../../../infra/external/cohere/CohereAIClassifierService";
import { Product as DomainProduct } from "../../../domain/entities/Products";

type ProductInput = {
    name: string;
    category: string;
};

export class GenerateProductDescriptionUseCase {
    constructor(private aiService: CohereAIClassifierService) { }

    async execute(product: ProductInput): Promise<string> {
        const prompt = `
          Você é um redator publicitário especializado em produtos.

          Gere uma **descrição comercial envolvente e detalhada em português do Brasil** para o seguinte produto, com base no nome e categoria fornecidos.

          Formato: texto corrido, sem HTML ou markdown.

          Produto:
          Nome: ${product.name}
          Categoria: ${product.category}
        `;

        const response = await this.aiService.summarize(prompt);
        return response.trim();
    }
}