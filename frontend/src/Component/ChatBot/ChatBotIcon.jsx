import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './ChatBot.css';

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen && <ChatBox onClose={toggleChatBox} />}
      <div className="chatbot-icon" onClick={toggleChatBox}>
        💬
      </div>
    </div>
  );
};

export default ChatBotIcon;
