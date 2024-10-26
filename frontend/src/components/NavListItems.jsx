import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

export const mainListItems = (handleMenuClick) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
    window.location.reload(); 
  };

  const isSelected = (path) => {
    return currentPath === path;
  };

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => handleMenuClick("VideoInsight")}
        sx={{
          mx: 1,
          mb: 0.5,
          px: 2,
          borderRadius: 2,
          backgroundColor: isSelected('video-insights') ? "white" : "inherit",
          color: isSelected('video-insights') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <UploadFileIcon
            sx={{
              color: isSelected('video-insights') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Video Insights" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleMenuClick("Visualization")}
        sx={{
          mx: 1,
          mb: 0.5,
          px: 2,
          borderRadius: 2,
          backgroundColor: isSelected('visualization') ? "white" : "inherit",
          color: isSelected('visualization') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <AutoGraphIcon
            sx={{
              color: isSelected('visualization') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Visualization" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleMenuClick("PlayingAreas")}
        sx={{
          mx: 1,
          mb: 0.5,
          px: 2,
          borderRadius: 2,
          backgroundColor: isSelected('playing-areas') ? "white" : "inherit",
          color: isSelected('playing-areas') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <SportsCricketIcon
            sx={{
              color: isSelected('playing-areas') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Playing Areas" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleMenuClick("PaymentGateway")}
        sx={{
          mx: 1,
          mb: 0.5,
          px: 2,
          borderRadius: 2,
          backgroundColor: isSelected('payment') ? "white" : "inherit",
          color: isSelected('payment') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <PsychologyIcon
            sx={{
              color: isSelected('payment') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Adaptive Learning" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleMenuClick("AIAssistant")}
        sx={{
          mx: 1,
          mb: 0.5,
          px: 2,
          borderRadius: 2,
          backgroundColor: isSelected('ai-assistant') ? "white" : "inherit",
          color: isSelected('ai-assistant') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <SupportAgentIcon
            sx={{
              color: isSelected('ai-assistant') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="AI Assistant" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleMenuClick("Reviews")}
        sx={{
          mx: 1,
          px: 2,
          mb: 0.5,
          borderRadius: 2,
          backgroundColor: isSelected('reviews') ? "white" : "inherit",
          color: isSelected('reviews') ? "#030947" : "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#030947",
            "& .MuiSvgIcon-root": {
              color: "#030947",
            },
          },
        }}
      >
        <ListItemIcon>
          <RateReviewOutlinedIcon
            sx={{
              color: isSelected('reviews') ? "#030947" : "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Reviews" />
      </ListItemButton>

      <ListItemButton
        onClick={handleLogout}
        sx={{
          mx: 1,
          px: 2,
          mb: 0.5,
          bottom: 0,
          position: 'fixed',
          backgroundColor: 'inherit',
          color: 'white',
          width: '16%'
        }}
      >
        <ListItemIcon>
          <LogoutIcon
            sx={{
              color: "white",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};