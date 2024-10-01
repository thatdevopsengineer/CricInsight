import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import Link from "@mui/material/Link";


export default function WhyCricInsight() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 600 },
  });

  return (
    <animated.div style={animationProps}>
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#000',
          color: '#fff',
          padding: '2px',
          marginBottom: '5%',
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={12} md={7} sx={{ padding: '0 7%' }}>
            <Box sx={{ textAlign: 'left', pr: { md: 4 } }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Why CricInsight?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                CricInsight offers cutting-edge video analysis tools, empowering users to delve deep into cricket match insights.
                With advanced shot detection and classification, CricInsight provides a comprehensive understanding of player performance and playing areas.
                Its adaptive learning feature offers personalized feedback, making it a must-have for cricket enthusiasts seeking to improve their game.
              </Typography>
              <Box>
              <Link href="/login">
                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                    backgroundColor: '#fff',
                    color: '#000',
                    px: 3,
                    borderRadius: '25px',
                  }}
                >
                  Try now
                </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    background: '#000',
                    border: '0.5px solid #fff',
                    px: 2,
                    borderRadius: '25px',
                  }}
                >
                  Contact us
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/why-cricinsight.png"
              alt="Why CricInsight"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </animated.div>
  );
}
