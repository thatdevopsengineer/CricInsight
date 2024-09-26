import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid,Card, CardContent, TextField, InputAdornment, IconButton, Box} from "@mui/material";
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
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 


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
            "Tell me about the playing areas I need to work on?",
            "Tell me about my cover drive and its areas of improvements?",
            "Walk me through how to play pace bowling?",
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
                  borderRadius: 5,
                  mr: 0.5,
                  width: 35,
                  height: 35,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "background-color 0.3s", 
                  "&:hover": {
                    cursor: 'pointer',
                    bgcolor: "#F0F0F0", 
                  },
                }}
              >
                <EditIcon sx={{ width: 20 }} />
              </Box>
            ) : (
              <img src="./logo.png" alt="Logo" height={30} sx={{ mr: 0.5 }} />
            )}

            <Typography
              variant="body1"
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor:
                  message.role === "user" ? "#F0F0F0" : "#F0F0F0",
                maxWidth: "70%",
              }}
              component="div" // Use 'div' to allow HTML content rendering
              dangerouslySetInnerHTML={{ __html: message.content }} // Render HTML safely
            />
          </Box>
        ))}
        {isLoading && (
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", textAlign: "center" }}
          >
            AI Assistant is thinking...
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: "5%",
          width: "62.5%",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          // borderRadius: 20,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter a prompt here"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
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
