import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShareIcon from "@mui/icons-material/Share";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import { mainListItems } from "./NavListItems";
import Visualization from "./Visualization";
import VideoInsight from "./VideoInsight";
import PaymentGateway from "./PaymentGateway";
import PlayingAreas from "./PlayingAreas";
import Profile from "./Profile";
import AIAssistant from "./AIAssistant";
import Reviews from "./Reviews";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none", 
  borderBottom: `1px solid #ccc`, 
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#030947",
    },
    secondary: {
      main: "#D52728",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F1F1F",
    },
    primary: {
      main: "#33C0FF",
    },
    secondary: {
      main: "#5733FF",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("VideoInsight");

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: theme.palette.background.default,
          marginTop: 7,
        }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
              backgroundColor: theme.palette.background.default,
              boxShadow: "none", // Remove shadow here
              color: theme.palette.text.primary,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: theme.palette.text.primary,
                boxShadow: "none", // Remove shadow here
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Overview
            </Typography>
            <IconButton sx={{ boxShadow: "none" }}> {/* Remove shadow here */}
              <ShareIcon sx={{ color: theme.palette.text.primary, mx: 1 }} />
            </IconButton>
            <IconButton onClick={toggleTheme} sx={{ boxShadow: "none" }}> {/* Remove shadow here */}
              {darkMode ? (
                <LightModeIcon
                  sx={{ color: theme.palette.text.primary, mx: 1 }}
                />
              ) : (
                <DarkModeIcon
                  sx={{ color: theme.palette.text.primary, mx: 1 }}
                />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 40,
                objectFit: "cover",
                margin: "0 auto",
              }}
              alt="Logo"
              src="./logo.png"
            />
            <Typography
              component="h1"
              variant="h6"
              color={theme.palette.text.primary}
              noWrap
              sx={{ fontWeight: "bold" }}
            >
              CricInsight
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ flexGrow: 1 }}>
            {mainListItems(handleMenuClick, selectedComponent)}
          </List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            backgroundColor: theme.palette.background.default,
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {selectedComponent === "Visualization" && <Visualization />}
                {selectedComponent === "VideoInsight" && <VideoInsight />}
                {selectedComponent === "PlayingAreas" && <PlayingAreas />}
                {selectedComponent === "PaymentGateway" && <PaymentGateway />}
                {selectedComponent === "Profile" && <Profile />}
                {selectedComponent === "AI Assistant" && < AIAssistant/>}
                {selectedComponent === "Reviews" && < Reviews/>}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


// {message.role === "user" ? (
//   // For User messages, show the Edit icon to the left
//   <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
//     <EditIcon sx={{ color: "#757575" }} />
//   </Box>
// ) : (
//   // For Assistant messages, show the logo to the left
//   <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
//     <img src="./logo.png" alt="Logo" height={40} />
//   </Box>
// )}