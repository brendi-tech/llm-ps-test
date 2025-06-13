import { config } from "dotenv";
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

async function run() {
    config();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OpenAI API key is required");
    }

    const question = "De qual país é Singapura?";

    const { text } = await generateText({
        model: openai("gpt-4o-mini-2024-07-18"),
        system: "Você é um assistente de geografia.",
        prompt: question
    });

    console.log(text);
}

run();
