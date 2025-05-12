const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENROUTER_API_KEY;

async function askOpenRouter(userMessage) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Local Chat Client",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter error:", err.response?.data || err.message);
    throw new Error("Failed to fetch from OpenRouter");
  }
}

module.exports = { askOpenRouter };
