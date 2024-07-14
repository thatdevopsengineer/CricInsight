import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export const mainListItems = (handleMenuClick, selectedComponent) => (
  <React.Fragment>
    <ListItemButton
      onClick={() => handleMenuClick("VideoInsight")}
      sx={{
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
    <ListItemButton>
      <ListItemIcon>
        <SportsCricketIcon />
      </ListItemIcon>
      <ListItemText primary="Shot Detection" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PsychologyIcon />
      </ListItemIcon>
      <ListItemText primary="Adaptive Learning" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="User Profiling" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);
