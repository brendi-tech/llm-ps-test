import { testCases } from "./testCases";

export async function structurize(userMessage: string) {
    // Procura o testCase cuja userMessage seja igual à fornecida e retorna o expectedResults
    const found = testCases.find(tc => tc.userMessage === userMessage);
    if (found) {
        return found.expectedResults;
    }
    return null;
}