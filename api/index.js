import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages field is required and must be an array" });
    }

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    res.status(200).json(completion);
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({
      error: "AI server error",
      message: err.message || "Unknown error",
    });
  }
}
