import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
    temperature: 0.1,
    model: "gpt-4.1-nano"
})