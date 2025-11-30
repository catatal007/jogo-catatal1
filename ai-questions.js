/* ai-questions.js
   Faz chamada POST à função Netlify (proxy) que usa OpenAI.
   Não coloque chave no front-end.
*/

async function fetchAIQuestion(subject, difficulty='medium'){
  const url = '/.netlify/functions/gerarPergunta';
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ subject, difficulty, useAI: true })
  });
  if(!res.ok) throw new Error('Erro ao obter pergunta IA: ' + res.statusText);
  return await res.json(); // {title, explain, question, answer, choices?}
}
