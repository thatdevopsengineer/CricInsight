import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

// Slide-in animation keyframes
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

function HowToUseSection() {
  // State to track visibility of the section
  const [isVisible, setIsVisible] = useState(false);

  // useInView hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <Box sx={{ padding: 10, backgroundColor: "#F4F4F4" }} ref={ref}>
      <Grid container spacing={4}>
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              marginBottom: 2,
              animation: isVisible ? `${slideIn} 1s ease-out` : "none",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
            }}
          >
            How to Use?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Poppins, sans-serif",
              marginBottom: 4,
              color: "#4a4a4a",
              animation: isVisible ? `${slideIn} 1s ease-out 0.2s` : "none",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
            }}
          >
            Discover CricInsight for in-depth cricket analysis. Whether you're a
            player, coach, or team manager, it provides insights to enhance your
            cricket experience.
          </Typography>
        </Box>

        {[
          {
            step: "01",
            title: "Signup / Login",
            description:
              "Create an account first on the CricInsight platform or log in if you already have an account.",
          },
          {
            step: "02",
            title: "Upload Videos",
            description:
              "Upload your cricket match videos for analysis. You can trim videos and merge multiple videos as well.",
          },
          {
            step: "03",
            title: "Data Analytics",
            description:
              "Analyze your game and get highlights of your gameplay and get an overview of all the shots you play.",
          },
          {
            step: "04",
            title: "Area Calculation",
            description:
              "Calculates the percentage distribution of shots across different fielding areas for insightful analysis.",
          },
          {
            step: "05",
            title: "Adaptive Learning",
            description:
              "Get tailored solutions to enhance cricket skills based on identified technical flaws from your gameplay.",
          },
          {
            step: "06",
            title: "AI Assistant",
            description:
              "Get all your queries answered, have some cricket tips, and be guided to the CricInsight features."
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                py: 7,
                px: 5,
                borderRadius: 2,
                border: '1px solid #F4F4F4',
                height: "100%",
                transition: "transform 0.5s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
                },
                animation: isVisible ? `${slideIn} 1s ease-out ${0.1 * index}s` : "none",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(50px)",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: 1,
                  color: "#030947",
                }}
              >
                {item.step}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#4a4a4a",
                }}
              >
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HowToUseSection;
