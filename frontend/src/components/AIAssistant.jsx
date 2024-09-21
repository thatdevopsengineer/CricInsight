import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, TextField, InputAdornment, IconButton, Box, } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const AIAssistant = () => {
  const [userName, setUserName] = useState("");
  const email = localStorage.getItem("userEmail"); 

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:3001/api/username?email=${email}`)
        .then((response) => {
          setUserName(response.data.name); 
        })
        .catch((error) => {
          console.error("Error fetching username:", error);
        });
    }
  }, [email]);

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

      <Grid container spacing={2}>
        {[
          "Tell me about all the shots I play and which shots I need to practise?",
          "Tell me about the playing areas I need to work on?",
          "Tell me about my cover drive and its areas of improvements?",
          "Walk me through how to play pace bowling?",
        ].map((text, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
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
      
      {/* Question Box */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "rgba(0, 0, 0)",
            p: 2,
            borderRadius: 20,
            backgroundColor: "#F0F0F0",
            maxWidth: "500px", 
            textAlign: "right", 
          }}
        >
          How can I help you today?
        </Typography>
      </Box>
      
      {/* Answer Box*/}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src="./logo.png" alt="Logo" height={40} />
        <Typography
          variant="body1"
          sx={{
            color: "rgba(0, 0, 0)",
             ml:1.5
          }}
        >
          Sure! How can I assist you with Python development today? Do you need help with a specific project, debugging, or understanding a Python concepts.
        </Typography>

      </Box>
        <br /><br /><br />
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          bottom: "5%",
          width: "62.5%",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          borderRadius: 20,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter a prompt here"
          sx={{
            backgroundColor: "#F0F0F0",
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
                <SendIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Container>
  );
};

export default AIAssistant;
