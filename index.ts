import { config } from "dotenv";
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

async function run() {
    config();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OpenAI API key is required");
    }

    const question = "Qual é o país mais bonito do mundo?";

    const { text } = await generateText({
        model: openai("gpt-4.1-mini"),
        system: "Você é um assistente.",
        prompt: question
    });

    console.log(text);
}

run();
