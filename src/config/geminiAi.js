import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY });

async function main() {
//   try {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Explain how AI works"
//     })
//     console.log('response from gemini:', response.text)
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//   }
}

// Do not call main() at the top level
export default main;