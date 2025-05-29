import axios from "axios";

const COHERE_API_KEY = process.env.COHERE_API_KEY || '';

export const cohereClient = axios.create({
    baseURL: 'https://api.cohere.ai',
    headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
    },
});

export async function generateText(prompt: string) {
    try {
        const response = await cohereClient.post('/generate', {
            model: 'command',
            prompt,
            max_tokens: 300,
            temperature: 0.3,
        });
        return response.data;
    } catch (error) {
        console.error('Erro na chamada do Cohere generate:', error);
        throw error;
    }

}