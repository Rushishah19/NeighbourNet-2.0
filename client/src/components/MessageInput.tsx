import React, { useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          width: "calc(100% - 80px)",
          padding: "8px",
          marginRight: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={handleSend} style={{ padding: "8px 16px" }}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
