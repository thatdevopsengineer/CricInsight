import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, TextField, InputAdornment, IconButton, Box, Button} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { ModeEdit as EditIcon } from "@mui/icons-material"; 

const AIAssistant = () => {
  const [userName, setUserName] = useState("");
  const email = localStorage.getItem("userEmail");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSamples, setShowSamples] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3001/api/username?email=${email}`)
        .then((response) => {
          setUserName(response.data.firstName);
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
  }, [email]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    setShowSamples(false);
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_APP_GEMINI_API_KEY;
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: newMessage.content }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const candidates = response.data.candidates;
      if (
        candidates &&
        candidates[0] &&
        candidates[0].content &&
        candidates[0].content.parts &&
        candidates[0].content.parts[0]
      ) {
        const aiResponseText = candidates[0].content.parts[0].text;
        const aiResponse = { role: "assistant", content: formatResponse(aiResponseText) };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } else {
        console.error("Unexpected response structure:", response.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: "Sorry, I couldn't process your request.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Error: Unable to send message" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    text = text.replace(/\*/g, "<br />");
    text = text.replace(/\:/g, "<br/>");
    text = text.replace(/(#{1,6})\s*(.*?)(?=\n|$)/g, (match, hashes, content) => {
      const level = hashes.length;
      return `<h${level}>${content.trim()}</h${level}>`;
    });
    return text;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSampleClick = (sampleText) => {
    setInput(sampleText);
    setShowSamples(false);
    handleSendMessage();
  };

  const handleEditClick = (index, message) => {
    setIsEditing(true);
    setEditingMessageIndex(index);
    setEditingText(message.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingMessageIndex(null);
    setEditingText("");
  };

  const handleSaveEdit = () => {
    const updatedMessages = messages.map((msg, idx) => 
      idx === editingMessageIndex ? { ...msg, content: editingText } : msg
    );
    setMessages(updatedMessages);
    handleCancelEdit(); 
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: "left",
          mt: 2,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ pt: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "600",
              letterSpacing: 1,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(90deg, #0d0a1c, #201a47, #46399c, #332971, #6c58f1, #5948c6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hello, <span> </span>
              {userName || "User"}{" "}
            </span>
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: "rgba(0, 0, 0, 0.6)", letterSpacing: 1.5 }}
          >
            How can I help you today?
          </Typography>
        </Box>
        <img src="./assets/Transparent-logo.png" alt="Logo" height={160} />
      </Box>

      {showSamples && (
        <Grid container spacing={2}>
          {[
            "Tell me about all the shots I play and which shots I need to practise?",
            "Walk me through how to play pace bowling?",
            "Tell me about the playing areas I need to work on?",
            "Tell me about my cover drive and its areas of improvements?",
          ].map((text, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleSampleClick(text)}
                sx={{
                  backgroundColor: "#F0F0F0",
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "left", height: 80 }}
                    component="p"
                  >
                    {text}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <IconButton sx={{ bgcolor: "#fff" }}>
                      <LanguageOutlinedIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

<Box sx={{ mt: 2, mb: 10, overflowY: "auto" }}>
  {messages.map((message, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent:
          message.role === "user" ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      {message.role === "user" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: 'flex-end',
            alignItems: "center",
            maxWidth: '80%',
            mb: 1,
          }}
        >
          <Box
            sx={{
              borderRadius: 5,
              mr: 0.5,
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background-color 0.3s",
              "&:hover": {
                cursor: "pointer",
                bgcolor: "#F0F0F0",
              },
            }}
          >
            <EditIcon
              sx={{ width: 20 }}
              onClick={() => handleEditClick(index, message)}
            />
          </Box>
          {isEditing && editingMessageIndex === index ? (
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", minWidth: 800 }}>
              <TextField
                fullWidth
                multiline
                value={editingText}
                border="1px solid #F0F0F0"
                onChange={(e) => setEditingText(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #F0F0F0",
                    },
                  },
                }}
              />
              <Box sx={{ alignSelf: 'flex-end', pt: 1 }}>
                <Button
                  onClick={handleCancelEdit}
                  sx={{
                    color: '#2b2b2b',
                    border: '1px solid #030947',
                    borderRadius: '50px',
                    px: 2,
                    mr: 1,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#fff' }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  sx={{
                    bgcolor: '#030947',
                    color: '#fff',
                    borderRadius: '50px',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    border: '1px solid #2b2b2b',
                    '&:hover': { bgcolor: '#030947' }
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                backgroundColor: "#F1F0F0",
                borderRadius: "12px 12px 0 12px",
                p: 1.5,
                wordBreak: "break-word",
              }}
              component="span"
            >
              {message.content}
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <img src="./logo.png" alt="Logo" height={30} sx={{ mr: 0.5 }} />
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: message.content }}
            sx={{
              backgroundColor: "#F1F0F0",
              borderRadius: "0px 12px 12px 12px",
              p: 1.5,
              width: "75%",
              wordBreak: "break-word",
            }}
            component="div"
          />
        </Box>
      )}
    </Box>
  ))}

  {isLoading && (
    <Typography
      variant="body2"
      sx={{ fontStyle: "italic", width: '100%', textAlign: "center", mt: 2 }}
    >
      AI Assistant is thinking...
    </Typography>
  )}
</Box>

      <Box sx={{ position: "fixed", bottom: 0, width: '64%',pb: 2 }}>
        <TextField
          fullWidth
          multiline
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #F0F0F0"
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};

export default AIAssistant;
