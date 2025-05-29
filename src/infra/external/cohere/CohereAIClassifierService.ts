import { generateText } from "./cohere-client";
import { ProductCategory } from "../../../domain/enum/ProductCategory";

export class CohereAIClassifierService {

    async classify(description: string): Promise<{ category: ProductCategory; confidence: number }> {
        const prompt = `Classifique o seguinte produto em uma das categorias: CLOTHING, TECHNOLOGY, FOOD, BOOKS, OTHERS.\n\nProduto: "${description}"\nCategoria:`;

        try {
            const data = await generateText(prompt);

            console.log('Resposta bruta da IA:', JSON.stringify(data, null, 2));

            const rawText = data.generations?.[0]?.text?.trim().toUpperCase();

            if (!rawText) {
                throw new Error('Resposta inválida da IA');
            }

            const categories = Object.values(ProductCategory);
            const matchedCategory = categories.find(cat => rawText.startsWith(cat)) || ProductCategory.OTHERS;

            return { category: matchedCategory, confidence: 1 };
        } catch (error) {
            console.error('Erro ao classificar produto:', error);
            throw new Error('Erro ao classificar produto via IA');
        }
    }

    async summarize(prompt: string): Promise<string> {
        try {
            const data = await generateText(prompt);

            console.log('Resposta bruta da IA (summarize):', JSON.stringify(data, null, 2));

            const summary = data.generations?.[0]?.text?.trim();
            if (!summary) {
                throw new Error('Resumo inválido gerado pela IA');
            }

            return summary;
        } catch (error) {
            console.error('Erro ao gerar resumo:', error);
            throw new Error('Erro ao gerar resumo via IA');
        }
    }
}
