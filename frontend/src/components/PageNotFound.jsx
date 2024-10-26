import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div sx={{}}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          // pt: 5
        }}
      >
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h1" color="textPrimary">
            404
          </Typography>
          <Typography variant="h4" color="textPrimary">
            UH OH! You're lost.
          </Typography>
          <Typography variant="h5" color="textSecondary">
            The page you're looking for isn't here.
          </Typography>
          <Box sx={{ mt: 4 }}>
            {/* Button */}
            <Button variant="contained" onClick={handleClick}>
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default NotFoundPage;
