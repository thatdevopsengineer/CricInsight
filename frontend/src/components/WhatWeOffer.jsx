import React from "react";
import { Grid, Card, Typography, Box } from "@mui/material";

// Example image import (replace with your actual images)
// import cricInsightLogo from './path-to-logo.png'; 

const services = [
  {
    title: "Game Analysis",
    description: "Decode practice videos with precision, gaining deeper insights into player tactics and game dynamics.",
    icon: "path-to-game-analysis-icon.png", // Replace with actual image path
  },
  {
    title: "Techniques Improvement",
    description: "Identify flaws in your techniques and get improvement plans tailored for each shot.",
    icon: "path-to-techniques-improvement-icon.png",
  },
];

const mainservices = [
    {
        title: "Data Visualization",
        description: "Get a user-friendly visual representation of all the shots you play with their percentages.",
        icon: "path-to-data-visualization-icon.png",
      },
      {
        title: "Field Calculation",
        description: "Visualize shot distribution, analyzing fielding positions and percentages with precision.",
        icon: "path-to-field-calculation-icon.png",
      }
];

const Services = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      {/* Section Title */}
      <Typography variant="h6" color="error" gutterBottom>
        Our Services
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        What We Offer
      </Typography>

      {/* Services Grid */}
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {services.map((service, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ p: 3, minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              {/* Icon and Title */}
              <img src={service.icon} alt={service.title} style={{ marginBottom: "10px", width: "50px", height: "50px" }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {service.description}
              </Typography>
            </Card>
          </Grid>
        ))}

        {/* CricInsight Logo in the Center */}
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <img
              src='./logo.png'
              alt="CricInsight Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Card>
        </Grid>

        {mainservices.map((service, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ p: 3, minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              {/* Icon and Title */}
              <img src={service.icon} alt={service.title} style={{ marginBottom: "10px", width: "50px", height: "50px" }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {service.description}
              </Typography>
            </Card>
          </Grid>
        ))}

      </Grid>
    </Box>
  );
};

export default Services;
