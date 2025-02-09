import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { key, value });
    setKey("");
    setValue("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Example Apache Kafka Testing - Simple</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Status
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div
          style={{
            width: "40%",
            textAlign: "left",
            padding: "10px",
            border: "2px solid purple",
          }}
        >
          <h3>Producer</h3>
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              backgroundColor: "purple",
              color: "white",
            }}
          >
            Send
          </button>
        </div>

        <div
          style={{
            width: "40%",
            textAlign: "left",
            padding: "10px",
            border: "2px solid purple",
          }}
        >
          <h3>Consumer</h3>
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              height: "200px",
              overflow: "auto",
            }}
          >
            {messages.map((msg, index) => (
              <p key={index}>
                {msg.key}: {msg.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
