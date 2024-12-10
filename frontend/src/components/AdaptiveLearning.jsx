import React from "react";
import { Box, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";

const AdaptiveLearning = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography
                variant="h5"
                align="center"
                sx={{
                    pb:1, fontWeight: "bold", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                }}
            >
                Adaptive Learning
            </Typography>
            <p align="center">Identify flaws in your techniques and get improvement plans tailored for each shot.

            </p>

            <Grid container spacing={2} alignItems="center" mt={1}>  
                {/* Left Section */}
                <Grid item xs={4}>
                    <Box
                        component="img"
                        src="../../drives.png" // Replace with your image URL
                        alt="Left Section Image"
                        sx={{ width: "100%", borderRadius: 2 }}
                    />
                </Grid>

                {/* Middle Section */}
                <Grid item xs={4}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "500", px: 2, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', }} gutterBottom>
                            Flaws in Shots:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Bottom hand appears too tight, overpowering the stroke." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Grip should be relaxed for better control and fluidity." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Front foot is rigid and not pointing towards the shot direction." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Back foot is flat and lacks a pivot, limiting weight transfer." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Head is not aligned over the ball, reducing control and accuracy." />
                            </ListItem>


                        </List>
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid item xs={4}>
                    <Box
                        component="img"
                        src="../../zohaib-drives.png" // Replace with your image URL
                        alt="Right Section Image"
                        sx={{ width: "100%", borderRadius: 2 }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdaptiveLearning;
