import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent
} from '@mui/material';
import { Phone, Mail } from 'lucide-react';

const ContactForm = () => {
  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 3 }}>
      <Typography variant="subtitle1" color="error" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Get in touch with us
      </Typography>
      
      <Card sx={{ bgcolor: '#F3F3F3', borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Drop us a message
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            We will get back to you as soon as possible.
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Company Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Work Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#030D40', 
                '&:hover': { bgcolor: '#030D40' } 
              }}
            >
              Send
            </Button>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone color="#030D40" size={24} style={{ marginRight: '12px' }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  + 1800 145 276
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Call us
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Mail color="#030D40" size={24} style={{ marginRight: '12px' }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  cricinsight@gmail.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email us
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactForm;