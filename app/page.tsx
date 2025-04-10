'use client';
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Привет! Чем могу помочь?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { from: "user", text: input };
    setMessages([...messages, newMessage]);
    const botReply = { from: "bot", text: `Ты сказал: ${input}` };
    setTimeout(() => {
      setMessages(prev => [...prev, botReply]);
    }, 500);
    setInput("");
  };

  return (
    <main style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Чат со мной</h1>
      <div style={{ marginTop: 20, marginBottom: 20, maxHeight: 300, overflowY: 'auto' }}>
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
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Напиши сообщение..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={{ padding: '8px 12px' }}>Отправить</button>
      </div>
    </main>
  );
}
 
