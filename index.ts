import { config } from "dotenv";
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

import { testCases, type TestCase, type Product } from './testCases';
import { runTestComparisons } from './testComparison';

async function structurize(userMessage: string) {
    // Procura o testCase cuja userMessage seja igual à fornecida e retorna o expectedResults
    const found = testCases.find(tc => tc.userMessage === userMessage);
    if (found) {
        return found.expectedResults;
    }
    return null;
}


async function run() {
    config();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OpenAI API key is required");
    }

    const finalResult = await runTestComparisons();
    console.log(`Final result: ${finalResult}`);
}

run();
