import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

const AIAssistant = () => {
  const [userName, setUserName] = useState('');  // To store the user's name
  const email = localStorage.getItem('userEmail');   // Get the email from localStorage

  // Fetch the username from the backend
  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3001/api/username?email=${email}`)
        .then(response => {
          setUserName(response.data.name); // Update the username from the backend response
        })
        .catch(error => {
          console.error('Error fetching username:', error);
        });
    }
  }, [email]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ textAlign: 'left', mb: 5 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: '600', letterSpacing: 1, color: 'rgba(0,0,0,0.6)' }}>
          <span
            style={{
              background: 'linear-gradient(90deg, #0d0a1c, #201a47, #46399c, #332971, #6c58f1, #5948c6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hello, <span> </span>
            {userName || 'User'} {/* Fallback in case username is not yet loaded */}
          </span>
        </Typography>
        <Typography variant="h4" sx={{ color: 'rgba(0, 0, 0, 0.6)', letterSpacing: 1.5 }}>
          How can I help you today?
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {[
          'Tell me about all the shots I play and which shots I need to practise?',
          'Tell me about the playing areas I need to work on?',
          'Tell me about my cover drive and its areas of improvements?',
          'Walk me through how to play pace bowling?',
        ].map((text, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: '#F0F0F0', cursor: 'pointer', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body1" sx={{ textAlign: 'left', height: 110 }} component="p">
                  {text}
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <IconButton sx={{ bgcolor: '#fff' }}>
                    <LanguageOutlinedIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', position: 'fixed', bottom: '5%', width: '62.5%', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 20 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter a prompt here"
          sx={{
            backgroundColor: '#F0F0F0',
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                border: 'none', // No border on hover
              },
              '&.Mui-focused fieldset': {
                border: 'none', // No border when focused
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
