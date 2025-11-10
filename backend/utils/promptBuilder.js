// utils/promptBuilder.js
export function buildPrompt(code) {
  return `You are a code complexity analyzer. Analyze the following code and respond with ONLY valid JSON (no markdown, no code blocks, no extra text).

Required JSON format:
{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "explanation": "Brief explanation of why these complexities"
}

Code to analyze:
${code}

Remember: Respond with ONLY the JSON object, nothing else.`;
}