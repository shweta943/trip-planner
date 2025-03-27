import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY });

export default async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain what is a transformer",
//   });
//   console.log(response.text);
}

await main();