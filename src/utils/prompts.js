export function buildQuestionPrompt(role, domain, difficulty, count) {
  return `You are an expert technical interviewer. Generate exactly ${count} interview questions for a ${difficulty}-level ${role} candidate, focused on ${domain}.

Return ONLY a valid JSON array, no explanation, no markdown. Format:
[
  {
    "id": 1,
    "question": "...",
    "topic": "...",
    "hint": "Key points to cover: ..."
  }
]`;
}

export function buildFeedbackPrompt(question, answer, role, difficulty) {
  return `You are an expert ${role} interviewer evaluating a ${difficulty}-level candidate.

Question: ${question}
Candidate's answer: ${answer}

Evaluate the answer and return ONLY a valid JSON object, no explanation, no markdown:
{
  "score": <number 1-10>,
  "summary": "<one sentence overall verdict>",
  "strengths": ["<point 1>", "<point 2>"],
  "improvements": ["<point 1>", "<point 2>"],
  "idealAnswer": "<brief example of a strong answer>"
}`;
}