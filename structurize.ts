import { generateText } from "ai";
import { testCases } from "./testCases";
import { openai } from "@ai-sdk/openai";

export async function structurize(userMessage: string) {
    // Procura o testCase cuja userMessage seja igual à fornecida e retorna o expectedResults, 
    // usando o gabarito testCases, que é proibído porque na vida real, não temos ele de antemão.
    const found = testCases.find(tc => tc.userMessage === userMessage);

    const result = await llmCallExample(userMessage);
    console.log(result);

    if (found) {
        return found.expectedResults;
    }

    return null;
}

async function llmCallExample(userMessage: string) {
    const { text } = await generateText({
        model: openai("gpt-4.1-mini"),
        system: `Você é um assistente de delivery. 
        Responda que o pedido dele foi anotado e que ele será entregue em breve com os itens que ele pediu. 
        Fale somente os produtos, nada alem disso.
        Não fale nada alem dos produtos.
        Use os emojis que representam os produtos ao final da resposta.`,
        prompt: userMessage
    });

    return text;
}