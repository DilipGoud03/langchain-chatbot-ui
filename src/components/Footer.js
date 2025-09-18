import React, { useState } from "react";
import { Card, Button, Form } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props) => {
  const { showSettings, toggleSettings } = props;

  // Chat states
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can I help you today?" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "user", text: newMessage }]);
    setNewMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "✅ Message received!" }
      ]);
    }, 800);
  };

  return (
    <div>
      {showSettings ? (
        <Card className="theme-chatbot">
          <Card.Body className="pt-4">
            <Button
              className="theme-chatbot-close"
              variant="close"
              size="sm"
              aria-label="Close"
              onClick={() => toggleSettings(false)}
            />

            <Card className="shadow-sm border-0" style={{size:'11px'}}>
              <Card.Header className="bg-primary text-white">
                💬 Chat Support
              </Card.Header>
              <Card.Body style={{ height: "300px", overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex mb-2 ${
                      msg.sender === "user"
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button variant="primary" className="ms-2" onClick={sendMessage}>
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
      )}

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
    </div>
  );
};
