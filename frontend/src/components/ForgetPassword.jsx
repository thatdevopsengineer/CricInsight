import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/forgot-password", { email });
      if (response.data.success) {
        toast.success("Password reset email sent!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to send reset email.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <ToastContainer />
      <Grid item xs={12} sm={6} md={4}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="h5" component="h1">Forget Password</Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            sx={{ my: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
