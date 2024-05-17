// import 'bootstrap/dist/css/bootstrap.min.css';
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

const Register = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        axios.post('http://localhost:3001/register', { firstName, lastName, email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully! Please Login to proceed.")
                    navigate('/login');
                }

            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Grid
                container
                component="main"
                sx={{ height: "109vh", overflowY: 'hidden', fontFamily: "Poppins, sans-serif" }}
            >
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            paddingTop: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{ fontWeight: "bold", fontSize: 64, position: "relative", paddingLeft: 6, alignSelf: "flex-start" }}
                            variant="h5"
                        >
                            Sign Up
                            <Box
                                component="span"
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    bottom: -4,
                                    height: 6,
                                    width: "80%",
                                    background: "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(event) => setFirstName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(event) => setLastName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </Grid>
                            </Grid>
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/login" variant="body2" sx={{ textTransform: 'none', color: '#000000', textDecoration: 'none' }}>
                                        Already have an account? <span style={{ color: '#D52728' }}>Sign in</span>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        background: "linear-gradient(90deg, #1F1F1F, #12152E, #030947)",
                        backgroundSize: "cover",
                        paddingTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src="./assets/logo.png" alt="Logo" />
                </Grid>
            </Grid>
        </div>
    )
}

export default Register
