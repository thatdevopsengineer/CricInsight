import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Drawer, List, Divider } from "@mui/material";
import { Person } from "@mui/icons-material";
import Visualization from "./Visualization";
import VideoInsight from "./VideoInsight";
import PaymentGateway from "./PaymentGateway";
import PlayingAreas from "./PlayingAreas";
import Profile from "./Profile";
import AIAssistant from "./AIAssistant";
import Reviews from "./Reviews";
import { mainListItems } from "./NavListItems";
import axios from "axios";
import VideoEditor from "./VideoInsight"; // Import the VideoEditor component

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("VideoInsight");
  const [userName, setUserName] = useState("");
  const email = localStorage.getItem("userEmail");

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

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#030947",
            color: "#FFFFFF",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <img
            src="./assets/home-logo.png"
            alt="Logo"
            style={{ width: "80%", maxWidth: 160 }}
          />
        </Box>
        <Divider />
        <List component="nav" sx={{ flexGrow: 1 }}>
          {mainListItems(handleMenuClick, selectedComponent)}
        </List>
        <Divider />
      </Drawer>

      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid #ccc`,
          color: "#000000",
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {userName || "User"}!
          </Typography>

          <IconButton
            onClick={() => handleMenuClick("PaymentGateway")}
            sx={{ color: "#000" }}
          >
            <img src="/premium20.png" alt="Payment" sx={{ width: 2, height: 2 }} />
          </IconButton>
          <IconButton sx={{ px: 1, color: "#000" }}>
            <Person onClick={() => handleMenuClick("Profile")} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 11, minHeight: "100vh" }}
      >
        {selectedComponent === "VideoInsight" && <VideoInsight />}
        {selectedComponent === "Visualization" && <Visualization />}
        {selectedComponent === "PlayingAreas" && <PlayingAreas />}
        {selectedComponent === "PaymentGateway" && <PaymentGateway />}
        {selectedComponent === "Profile" && <Profile />}
        {selectedComponent === "AIAssistant" && <AIAssistant />}
        {selectedComponent === "Reviews" && <Reviews />}
        
        {/* Render VideoEditor and pass the function to switch to Visualization */}
        {selectedComponent === "VideoEditor" && (
          <VideoEditor onDone={() => setSelectedComponent("Visualization")} />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
