import { buildQuestionPrompt, buildFeedbackPrompt } from "../utils/prompts";

const MODEL = "gemini-1.5-flash";

async function callGemini(prompt, maxTokens = 1000) {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${import.meta.env.VITE_ANTHROPIC_API_KEY}`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

export async function generateQuestions(role, domain, difficulty, count = 5) {
  const prompt = buildQuestionPrompt(role, domain, difficulty, count);
  const text = await callGemini(prompt, 1500);
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function getFeedback(question, answer, role, difficulty) {
  const prompt = buildFeedbackPrompt(question, answer, role, difficulty);
  const text = await callGemini(prompt, 1000);
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}