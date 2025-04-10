import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = chatCompletion.choices[0]?.message?.content ?? "Нет ответа.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ reply: "Ошибка ответа" }, { status: 500 });
  }
}

