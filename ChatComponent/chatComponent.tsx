import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  text: string;
}

const ChatComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null); // socket can be either Socket or null
  const [messages, setMessages] = useState<Message[]>([]); // Array of messages with Message type
  const [input, setInput] = useState<string>(''); // input is a string

  useEffect(() => {
    const socketInstance = io('http://localhost:3000'); // Backend WebSocket URL
    setSocket(socketInstance);

    socketInstance.on('message', (message: string) => { // Assuming message is a string
      setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: message }]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      socket.emit('message', input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: `You: ${input}` },
      ]);
      setInput('');
    }
  };

  // emitting each keystroke into the input through the websocket
  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
