import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Не удалось получить ответ.';
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: 'Ошибка ответа' });
  }
}
