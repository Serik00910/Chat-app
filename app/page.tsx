'use client';
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привет! Задай мне любой вопрос." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    const botMessage = { from: "bot", text: data.reply };
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Чат со мной</h1>
      <div style={{ marginTop: 20, marginBottom: 20, maxHeight: 400, overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            backgroundColor: msg.from === 'user' ? '#dbeafe' : '#f3f4f6',
            padding: 10,
            borderRadius: 8,
            marginBottom: 10
          }}>
            <strong>{msg.from === 'user' ? 'Ты' : 'Бот'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div>Бот думает...</div>}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Задай вопрос..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading} style={{ padding: '8px 12px' }}>
          Отправить
        </button>
      </div>
    </main>
  );
}
