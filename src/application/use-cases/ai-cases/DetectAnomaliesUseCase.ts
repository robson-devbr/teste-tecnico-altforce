import { CohereAIClassifierService } from "../../../infra/external/cohere/CohereAIClassifierService";
import { PgProductRepository } from "../../../infra/repositories/PgProductRepository";
import { Product as DomainProduct } from "../../../domain/entities/Products";

type AIProduct = {
    name: string;
    price: string;
    category: string;
    created_at?: string;
}

export class DetectAnomaliesUseCase {
  constructor(
    private productRepository: PgProductRepository,
    private aiService: CohereAIClassifierService
  ) {}

  async execute(): Promise<string> {
    const domainProducts: DomainProduct[] = await this.productRepository.findAll();

    const products: AIProduct[] = domainProducts.map((p) => ({
      name: p.name,
      price: Number(p.price).toFixed(2), 
      category: p.category,
      created_at: p.createdAt.toISOString(),
    }));

    const prompt = `
      Você é um analista de dados brasileiro.

      Detecte **anomalias de preço** nos seguintes produtos com base em seus nomes e categorias. Considere valores muito fora da média (para mais ou para menos) como potenciais anomalias.

      Formato de resposta:
      1. Liste os produtos com valores anômalos (nome, categoria e preço).
      2. Dê explicações simples do porquê cada valor parece fora do padrão.
      3. Responda **apenas em português**, sem usar HTML, JSON ou Markdown.

      Dados:
      ${JSON.stringify(products, null, 2)}
    `;


    const response = await this.aiService.summarize(prompt);
    return response.trim();
  }
}