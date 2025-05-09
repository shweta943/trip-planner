import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY });

async function getGeminiResponse(userPrompt) {
    console.log('userPrompt: ', userPrompt);
    // Define the query for a JSON array response
    const query = `${userPrompt}
      Respond ONLY in valid JSON format. Do NOT include markdown backticks or any explanation.`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query,
        })

        // Extract only the JSON part
        const answer = response.text.replace(/```json|```/g, "").trim();
        console.log('answer: ', answer);

        try {
            let array = JSON.parse(answer);
            console.log("Parsed Array:", array);
            return array;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

// Do not call main() at the top level
export default getGeminiResponse;