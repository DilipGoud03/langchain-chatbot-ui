import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Form } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./../axios";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import './Chatbot.css';  // Import custom CSS file for responsiveness

export default (props) => {
  const { showChatbot, toggleChatbot } = props;
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages") || "[]"));
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const loggedInEmployee = localStorage.getItem("token");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (loggedInEmployee) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages, loggedInEmployee]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loader]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoader(true);
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const data = { query: input };
    setInput("");
    try {
      setDisabled(true);
      const res = await api.post(`/chat-bot`, data);
      const bot = { sender: "bot", text: res.data || JSON.stringify(res) };
      setMessages((prev) => [...prev, bot]);
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.detail || "Failed api response.");
    } finally {
      setLoader(false);
      setDisabled(false);
    }
  };

  return (
    <div>
      {showChatbot ? (
        <Card className="theme-chatbot" style={{ width: "100%", maxWidth: "400px", height: "auto" }}>
          <Card.Body className="pt-4">
            <Button
              className="theme-chatbot-close"
              variant="close"
              size="sm"
              aria-label="Close"
              onClick={() => toggleChatbot(false)}
            />

            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary text-white">
                💬 Chat Support
              </Card.Header>

              <Card.Body className="chat-body" style={{ height: "300px", overflowY: "auto" }}>
                {error && <div className="alert alert-danger">{error}</div>}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex mb-2 ${msg.sender === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                      }`}
                  >
                    <div
                      className={`p-2 rounded-2 ${msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-light text-dark"
                        }`}
                      style={{ maxWidth: "90%" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {loader && (
                  <div className="d-flex justify-content-start mb-2">
                    <div className="p-2 rounded-2 bg-light text-dark">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </Card.Body>
              <Card.Footer className="p-2">
                <div className="d-flex w-100 gap-2">
                  <Form.Control
                    type="text"
                    className="flex-grow-1"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    variant="primary"
                    disabled={disabled}
                    onClick={sendMessage}
                    style={{ width: "42px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className="theme-chatbot theme-chatbot-expand"
          onClick={() => toggleChatbot(true)}
        >
          <Card.Body className="p-3 py-2">
            <span className="fw-bold h3">
              <FontAwesomeIcon /> 💬
            </span>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
