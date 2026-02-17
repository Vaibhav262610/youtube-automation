require("dotenv").config();
const axios = require("axios");

async function generateScript(topic) {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Write a YouTube Shorts script about ${topic}.
Maximum 80 words.
Must be under 35 seconds of speech.
Short punchy sentences.
`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = generateScript;
