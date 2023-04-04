import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import openai from "./openai";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // estado para mostrar el CircularProgress
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { content: input, sender: "user" },
    ]);
    const prompt = input;
    setInput("");
    setLoading(true); // mostramos el CircularProgress

    try {
      const response = await openai.post("/davinci/completions", {
        prompt: `User: ${prompt}\nAI:`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
      });

      const aiReply = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: aiReply, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error al llamar a la API de OpenAI:", error);
    } finally {
      setLoading(false); // ocultamos el CircularProgress
    }
  };

  return (
    <Box className="chat-container">
      <Box className="chat-messages">
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    style={{
                      color: message.sender === "user" ? "blue" : "green",
                    }}
                  >
                    {message.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box className="chat-input">
        <form onSubmit={handleSendMessage}>
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
            {loading && (
                <Box className="chat-loading">
                    <CircularProgress color="secondary" size={60} />
                </Box>
                )}

          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Chat;
