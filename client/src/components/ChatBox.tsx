import React, { useState, useEffect } from "react";
import MessageList from "./MessageList"; // Component to display messages
import MessageInput from "./MessageInput"; // Component for input field
import socketService from "../services/socketServices"; // WebSocket service

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // Store chat messages
  const [isConnected, setIsConnected] = useState(false); // Track WebSocket connection status

  useEffect(() => {
    // Connect to the WebSocket server
    socketService.connect("http://localhost:3000"); // Update with your backend URL

    // Listen for connection status
    socketService.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to WebSocket server!");
    });

    socketService.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server.");
    });

    // Listen for incoming messages
    socketService.on("message", (message: string) => {
      console.log("New message received:", message);
      setMessages((prev) => [...prev, message]); // Append new message to the list
    });

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (message.trim() && isConnected) {
      socketService.emit("message", message); // Send message to the WebSocket server
      setMessages((prev) => [...prev, `You: ${message}`]); // Append message locally
    } else {
      console.error("Cannot send message: Not connected to the server.");
    }
  };

  return (
    <div style={styles.chatBox}>
      <h2>Customer-Worker Chat</h2>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
      {!isConnected && <p style={styles.status}>Connecting to chat server...</p>}
    </div>
  );
};

export default ChatBox;

// Styles (Optional)
const styles = {
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "400px",
    margin: "0 auto",
  },
  status: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
};
