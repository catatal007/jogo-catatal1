// netlify/functions/gerarPergunta.js
exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const subject = body.subject || 'math';
    const useAI = !!body.useAI;

    // If environment variable OPENAI_API_KEY exists and useAI true -> call OpenAI
    if(useAI && process.env.OPENAI_API_KEY){
      // build prompt
      const prompt = `Gere UMA única pergunta de ${subject} (nível ensino médio), devolva somente JSON com chaves:
{"title":"", "explain":"", "question":"", "answer":"", "choices": null_or_array}
Sem texto adicional.`;
      // call OpenAI Chat Completions
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer '+process.env.OPENAI_API_KEY
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role:'user', content: prompt }],
          max_tokens: 400,
          temperature: 0.7
        })
      });

      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content || null;
      if(!content) throw new Error('OpenAI retorno vazio');

      // Try to parse JSON from model output
      let parsed = {};
      try {
        // Model should return JSON; try parse
        parsed = JSON.parse(content);
      } catch (err) {
        // fallback: put raw text in question
        parsed = { title: subject, explain: '', question: content, answer: '' };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(parsed)
      };
    }

    // Otherwise: generate offline using same logic from front-end
    // Simple fallback generator:
    const Auto = require('./auto_helper').AutoGenerator; // see note below
    const q = Auto(subject);
    return { statusCode: 200, body: JSON.stringify(q) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
