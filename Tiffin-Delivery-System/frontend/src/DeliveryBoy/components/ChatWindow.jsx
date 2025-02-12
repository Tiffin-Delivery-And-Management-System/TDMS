// ChatWindow.js
import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load messages from local storage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'delivery-boy' };
      setMessages((prev) => [...prev, newMessage]);
      setInput('');

      // Simulate a bot reply after 1 second
      setTimeout(() => {
        const botReply = { text: 'This is a customer reply', sender: 'customer' };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
