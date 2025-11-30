/* ai-questions.js
   This file contains helper functions that call a server-side endpoint
   which in turn calls OpenAI. We keep the client free of secrets.
*/

// Example: POST to /api/generate-question with { subject: 'math', difficulty: 'medium' }
// The server returns { title, explain, question, answer, choices? }

async function fetchAIQuestion(subject, difficulty='medium'){
  // config.AI_PROXY_URL is defined in config.js or from serverless host
  const url = (typeof CONFIG !== 'undefined' && CONFIG.AI_PROXY_URL) ? CONFIG.AI_PROXY_URL : '/.netlify/functions/generate-question';
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({subject, difficulty})
  });
  if(!res.ok) throw new Error('Erro ao obter pergunta IA');
  return await res.json(); // expected {title, explain, question, answer, choices?}
}
