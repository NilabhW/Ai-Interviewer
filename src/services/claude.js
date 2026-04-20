import { buildQuestionPrompt, buildFeedbackPrompt } from "../utils/prompts";

// Model IDs for Groq (2026)
const MODEL = "llama-3.1-8b-instant"; 

async function callGroq(prompt, maxTokens = 1000) {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "Return only valid JSON." },
          { role: "user", content: prompt }
        ],
        // Swapped to standard max_tokens just to be safe with OpenAI compatibility
        max_tokens: maxTokens, 
        response_format: { type: "json_object" } 
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Groq API Rejected Request:", err);
      throw new Error(err?.error?.message || "Groq API error");
    }

    const data = await res.json();
    return data.choices[0].message.content;

  } catch (error) {
    // This will catch CORS issues, network failures, and bad API payloads
    console.error("CRITICAL FETCH ERROR:", error);
    throw error; // Still throw it so your UI knows to stop loading
  }
}

// Your existing wrapper functions remain the same logic
export async function generateQuestions(role, domain, difficulty, count = 5) {
  const prompt = buildQuestionPrompt(role, domain, difficulty, count);
  const text = await callGroq(prompt, 2000);
  return JSON.parse(text); // No need for .replace() regex because of json_object format!
}

export async function getFeedback(question, answer, role, difficulty) {
  const prompt = buildFeedbackPrompt(question, answer, role, difficulty);
  const text = await callGroq(prompt, 1000);
  return JSON.parse(text);
}