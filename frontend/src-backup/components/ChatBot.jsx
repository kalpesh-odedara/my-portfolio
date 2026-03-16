import { useState, useEffect, useRef } from 'react';

const dataset = [
  { question: 'who are you', answer: 'I am Odedara Kalpesh, a Full-Stack & AI Developer.' },
  { question: 'your name', answer: 'My name is Odedara Kalpesh.' },
  { question: 'what is your expertise', answer: 'I specialize in React, Node.js, Python, MongoDB, and AI chatbot solutions.' },
  { question: 'where are you based', answer: 'I am based in India and open to remote opportunities.' },
  { question: 'what projects do you have', answer: 'I built DermAI, Role Assign System, Feedback System, Furniture Shop, Jewelry Shop, Online Learning Platform, and Alpha Wear.' },
  { question: 'what is your cgpa', answer: 'I have a 9.00 SGPA.' },
  { question: 'contact', answer: 'You can contact me through the contact form in this portfolio.' },
];

const getAnswer = (input) => {
  const text = input.trim().toLowerCase();
  if (!text) return 'Please ask a question.';

  const match = dataset.find((item) => text.includes(item.question));
  if (match) return match.answer;

  // If question mentions something general in-domain
  const inDomain = ['project', 'role', 'feedback', 'e-commerce', 'dermai', 'ai', 'full-stack', 'backend', 'frontend'];
  if (inDomain.some((word) => text.includes(word))) {
    return 'I can help with my projects and development experience. Ask me about my web apps or AI systems.';
  }

  return 'This question is not related to Kalpesh Odedara, ask related to domain please.';
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am Kalpesh’s assistant. Ask me about projects or my profile.' },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const user = { role: 'user', text: input };
    setMessages((prev) => [...prev, user]);
    setInput('');
    const answer = getAnswer(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    }, 300);
  };

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 999, fontFamily: 'Inter, Arial, sans-serif' }}>
      {!open ? (
        <button onClick={() => setOpen(true)} style={{ borderRadius: 999, background: '#2563eb', color: 'white', border: 'none', padding: '10px 14px', fontWeight: 700, cursor: 'pointer' }}>
          Chat with Kalpesh
        </button>
      ) : (
        <div style={{ width: 320, maxWidth: '90vw', background: 'white', borderRadius: 16, boxShadow: '0 10px 24px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}>
          <div style={{ padding: 10, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', color: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <div>
              <div style={{ fontWeight: 700 }}>Kalpesh Chat</div>
              <div style={{ fontSize: 11, color: '#cbd5e1' }}>Ask about profile and projects</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 700 }}>✕</button>
          </div>
          <div style={{ padding: 10, maxHeight: 240, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#e0e7ff' : '#f3f4f6', color: '#111827', borderRadius: 10, padding: 8, maxWidth: '90%' }}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', padding: 10, display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask Kalpesh..."
              style={{ flex: 1, borderRadius: 8, border: '1px solid #cbd5e1', padding: '8px 10px', fontSize: 14 }}
            />
            <button onClick={send} style={{ borderRadius: 8, border: 'none', background: '#2563eb', color: 'white', padding: '8px 12px', cursor: 'pointer', fontWeight: 700 }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
