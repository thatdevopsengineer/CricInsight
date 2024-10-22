import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { Phone, Mail } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionTypography = motion(Typography);
const MotionCard = motion(Card);
const MotionTextField = motion(TextField);
const MotionButton = motion(Button);

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const ContactForm = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={containerVariants}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3, textAlign: 'center' }}>
        <MotionTypography
          variant="body1"
          color="#030D40"
          sx={{ fontWeight: 'bold' }}
          variants={itemVariants}
        >
          Contact Us
        </MotionTypography>
        <MotionTypography
          variant="h3"
          fontWeight="bold"
          sx={{ textAlign: 'center' }}
          gutterBottom
          variants={itemVariants}
        >
          Get in touch with us
        </MotionTypography>
        
        <MotionCard
          sx={{ bgcolor: '#F3F3F3', borderRadius: 2, boxShadow: 'none', textAlign: 'left' }}
          variants={itemVariants}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Drop us a message
                  </Typography>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    We will get back to you as soon as possible.
                  </Typography>
                </motion.div>
                
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <MotionTextField
                        fullWidth
                        sx={{ bgcolor: '#fff' }}
                        placeholder="Full Name"
                        variant="outlined"
                        variants={itemVariants}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MotionTextField
                        fullWidth
                        placeholder="Company Name"
                        sx={{ bgcolor: '#fff' }}
                        variant="outlined"
                        variants={itemVariants}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MotionTextField
                        fullWidth
                        placeholder="Work Email"
                        variant="outlined"
                        sx={{ bgcolor: '#fff' }}
                        variants={itemVariants}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MotionTextField
                        fullWidth
                        sx={{ bgcolor: '#fff' }}
                        placeholder="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        variants={itemVariants}
                      />
                    </Grid>
                  </Grid>
                  <MotionButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      borderRadius: 2,
                      bgcolor: '#030D40', 
                      '&:hover': { bgcolor: '#030D40' } 
                    }}
                    variants={itemVariants}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send
                  </MotionButton>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Phone color="#fff" size={35} style={{ marginRight: '12px', background: '#030D40', padding: 8, borderRadius: 50 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      + 1800 145 276
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Call us
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Mail color="#fff" size={35} style={{ marginRight: '12px', background: '#030D40', padding: 8, borderRadius: 50 }}  />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      cricinsight@gmail.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email us
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            </Grid>
          </CardContent>
        </MotionCard>
      </Box>
    </motion.div>
  );
};

export default ContactForm;