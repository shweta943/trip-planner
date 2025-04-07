import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY });

async function getGeminiResponse() {
    // Define the query for a JSON array response
      const query = `Provide the top 9 most visited travel destinations in India in 2024. Each object should have:
      - "title" (Place Name)
      - "bestTimeToVisit" (Month-Range)
      - "highlights" (Array of key attractions like ['Beaches', 'Nightlife'], array should have maximum 2 elements)
      - "details" (Short description about the place)
      Ensure the response is valid JSON.`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query,
        })

        // Extract only the JSON part
        const answer = response.text.replace(/```json|```/g, "").trim();

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