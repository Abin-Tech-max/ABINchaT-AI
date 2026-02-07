import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, model } = req.body;

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages
    });

    res.status(200).json(completion);
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      error: "AI server error",
      details: err.message
    });
  }
}
