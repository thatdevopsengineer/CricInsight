import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "@mui/material";

export const mainListItems = (handleMenuClick, selectedComponent) => (
  <React.Fragment>
    <ListItemButton
      onClick={() => handleMenuClick("VideoInsight")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          
          selectedComponent === "VideoInsight" ? "#030947" : "inherit",
        color: selectedComponent === "VideoInsight" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <UploadFileIcon
          sx={{
            color: selectedComponent === "VideoInsight" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Upload Videos" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handleMenuClick("Visualization")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          selectedComponent === "Visualization" ? "#030947" : "inherit",
        color: selectedComponent === "Visualization" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <AutoGraphIcon
          sx={{
            color: selectedComponent === "Visualization" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Visualization" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handleMenuClick("PlayingAreas")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          selectedComponent === "PlayingAreas" ? "#030947" : "inherit",
        color: selectedComponent === "PlayingAreas" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <SportsCricketIcon
          sx={{
            color: selectedComponent === "PlayingAreas" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Playing Areas" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handleMenuClick("PaymentGateway")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          selectedComponent === "PaymentGateway" ? "#030947" : "inherit",
        color: selectedComponent === "PaymentGateway" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <PsychologyIcon
          sx={{
            color: selectedComponent === "PaymentGateway" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Adaptive Learning" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handleMenuClick("Profile")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          selectedComponent === "Profile" ? "#030947" : "inherit",
        color: selectedComponent === "Profile" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <PersonIcon
          sx={{
            color: selectedComponent === "Profile" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>

    <ListItemButton
      onClick={() => handleMenuClick("AI Assistant")}
      sx={{
        borderBottom: '1px solid #ccc',
        backgroundColor:
          selectedComponent === "AI Assistant" ? "#030947" : "inherit",
        color: selectedComponent === "AI Assistant" ? "white" : "inherit",
      }}
    >
      <ListItemIcon>
        <SupportAgentIcon
          sx={{
            color: selectedComponent === "AI Assistant" ? "white" : "inherit",
          }}
        />
      </ListItemIcon>
      <ListItemText primary="AI Assistant" />
    </ListItemButton>


  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link 
    href="/login"
    sx={{
      textTransform: "none",
      textDecoration: "none",      
      color: "#000000",
      
    }}
    >
    <ListItemButton sx={{borderTop: '1px solid #ccc'}}>
      <ListItemIcon >
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
