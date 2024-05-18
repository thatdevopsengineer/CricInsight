import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/dashboard');
            }
            else{
                alert('Incorrect credentials! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
      <Grid
        container
        component="main"
        sx={{
          height: "109vh",
          overflowY: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            background: "linear-gradient(90deg, #030947, #12152E,  #1F1F1F)",
            backgroundSize: "cover",
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="./assets/logo.png" alt="Logo" />
        </Grid>

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              paddingTop: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: 64,
                position: "relative",
                paddingLeft: 6,
                alignSelf: "flex-start",
              }}
              variant="h5"
            >
              Login
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -5,
                  height: 6,
                  width: "80%",
                  background:
                    "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
                  borderRadius: "5px",
                  marginLeft: 6,
                }}
              />
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 5 }}
            >
                
              <TextField
              
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                sx={{ my: 2 }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#030947",
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{
                      textTransform: "none",
                      color: "#000000",
                      textDecoration: "none",
                    }}
                  >
                    Don't have an account?{" "}
                    <span style={{ color: "#D52728" }}>Sign Up</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
    )
}

export default Login