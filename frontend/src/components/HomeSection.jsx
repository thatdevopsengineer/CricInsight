import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import { useSpring, animated } from "@react-spring/web";

function HomeSection({ imageSrc }) {
  const textAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(-50px)" },
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 500 },
    delay: 300,
  });

  const imageAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { duration: 500 },
    delay: 600,
  });

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const headerOffset = 80; 
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        backgroundColor: "#000000",
        paddingTop: "10%",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          gap: 1,
        }}
      >
        <animated.div style={textAnimation}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "60px",
              },
              paddingLeft: {
                xs: 0,
                md: 15,
              }
              ,marginTop: {
                xs: 15,
                md: 0,
              }
              ,
              fontWeight: 100,
              color: "white",
              margin: 0,
            }}
          >
              Take your game to the next level with <Box sx={{fontWeight: '600'}}>CricInsight. </Box> 

          </Typography>
        </animated.div>
        <animated.div style={buttonAnimation}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 1,
              paddingTop: "10px",
              paddingLeft: {
                xs: 0,
                md: 15,
              },
            }}
          >
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#030947",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "25px",
                }}
              >
                Get Started
              </Button>
            </Link>
            <Button
              variant="outlined"
              onClick={() => scrollToSection("contact")} 
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                borderColor: "#030947",
                textTransform: "none",
                borderRadius: "25px",
              }}
            >
              Contact Us
            </Button>
          </Box>
        </animated.div>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: { xs: 2, md: 0 },
        }}
      >
        <animated.img
          src={imageSrc}
          alt="Home"
          style={{ maxWidth: "100%", height: "auto", ...imageAnimation }}
        />
      </Box>
    </Box>
  );
}

HomeSection.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};

export default HomeSection;
