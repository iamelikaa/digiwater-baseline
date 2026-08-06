import React, { useState, useEffect, useRef } from 'react';
import './ChatAssistant.css';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi! Ask me anything about sensors, leaks, or dashboard actions.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Mock bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm a static prototype. I don't have a backend to answer that yet!", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="chat-assistant-container">
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>AI Assistant</h3>
              <span>Powered by DigiWater Intelligence</span>
            </div>
            <button className="chat-close-btn" onClick={toggleOpen} aria-label="Close chat">×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-row" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message" disabled={!inputValue.trim()}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
      <button className={`chat-floating-btn ${isOpen ? 'open' : ''}`} onClick={toggleOpen} aria-label="Toggle AI Assistant">
        {isOpen ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="close-icon" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="sparkle-icon" width="24" height="24">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                <path d="M5 4L5.5 5.5L7 6L5.5 6.5L5 8L4.5 6.5L3 6L4.5 5.5L5 4Z" />
                <path d="M19 18L19.5 19.5L21 20L19.5 20.5L19 22L18.5 20.5L17 20L18.5 19.5L19 18Z" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
