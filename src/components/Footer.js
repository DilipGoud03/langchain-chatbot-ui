import React, { useEffect, useState } from "react";
import { Card, Button, Form } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "./../axios"

export default (props) => {
  const { showSettings, toggleSettings } = props;
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages") || "[]"));
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const loggedInUser = localStorage.getItem("token");
  const [disabled, setDisabled] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("messages", JSON.stringify(messages));
    };
  }, [messages, loggedInUser]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoader(true)
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const data = {
      query: input
    }
    setInput("");
    try {
      setDisabled(true);
      const res = await api.post(`/chat-bot`, data);
      const bot = { sender: "bot", text: res.data || JSON.stringify(res) };
      setMessages((prev) => [...prev, bot]);
    } catch (err) {
      console.error("API error:", err);
      setError(err.response?.data?.detail || "Failed api response.");
    }
    finally {
      setLoader(false)
      setDisabled(false);
      // setTimeout(() => {
      //   setError('');
      // }, 3000);
    }

  };

  return (
    <div>
      {showSettings ? (
        <Card className="theme-chatbot" style={{ width: '23pc' }}>
          <Card.Body className="pt-4">
            <Button
              className="theme-chatbot-close"
              variant="close"
              size="sm"
              aria-label="Close"
              onClick={() => toggleSettings(false)}
            />

            <Card className="shadow-sm border-0" style={{ size: '11px' }}>
              <Card.Header className="bg-primary text-white">
                💬 Chat Support
              </Card.Header>
              <Card.Body style={{ height: "300px", overflowY: "auto" }}>
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
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {
                  loader &&
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
              </Card.Body>
              <Card.Footer className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button variant="primary" className="ms-2" disabled={disabled} onClick={sendMessage}>
                  Send
                </Button>
              </Card.Footer>
            </Card>
          </Card.Body>
        </Card>
      ) : (
        <Card
          className="theme-chatbot theme-chatbot-expand"
          onClick={() => toggleSettings(true)}
        >
          <Card.Body className="p-3 py-2">
            <span className="fw-bold h3">
              <FontAwesomeIcon /> 💬
            </span>
          </Card.Body>
        </Card>
      )
      }

      <footer className="footer section py-5">
        {/* <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2019-{`${currentYear} `}
              <Card.Link
                href="https://themesberg.com"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                Themesberg{" "}
              </Card.Link>
              distributed by{" "}
              <Card.Link
                href="https://themewagon.com"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                ThemeWagon
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Link href="#">About</Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Link href="#">Themes</Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Link href="#">Blog</Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </Col>
        </Row> */}
      </footer>
    </div >
  );
};
