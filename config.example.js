// config.example.js
// Copy this file to config.js locally for testing only (DO NOT commit config.js with your real key)

const CONFIG = {
  // If you use a serverless proxy, put its URL here (recommended)
  AI_PROXY_URL: '/.netlify/functions/generate-question'
};

// If you want to test **locally** by putting your OpenAI key into a file (NOT RECOMMENDED for public repos),
// you would instead create a file config.js with:
// const CONFIG = { LOCAL_OPENAI_KEY: "sk-...YOUR_KEY_HERE" };
// And use a client-side fetch directly to OpenAI (for quick local testing only).
