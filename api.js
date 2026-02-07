import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OPENAI_API_KEY missing" });
  }

  try {
    const { messages, model } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages
    });

    return res.status(200).json(completion);
  } catch (err) {
    console.error("OPENAI ERROR:", err);
    return res.status(500).json({
      error: "AI server error",
      details: err.message
    });
  }
}
