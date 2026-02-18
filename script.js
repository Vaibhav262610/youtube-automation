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
          content: `Write a VIRAL YouTube Shorts script about ${topic}.

RULES:
- 60-80 words MAXIMUM
- 25-35 seconds when spoken
- Start with SHOCKING hook or question
- Short punchy sentences (3-6 words each)
- Use numbers and facts
- Create urgency and curiosity
- NO hashtags, emojis, or music notes
- Write for FAST energetic delivery

STYLE: Like viral TikTok/YouTube Shorts - fast, shocking, attention-grabbing!

Example:
"This AI makes $10,000 daily! No joke. It writes content. Sells products. Never sleeps. 97% of people don't know this exists. The top 3% are getting rich. Right now. While you watch this. Will you join them?"
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
