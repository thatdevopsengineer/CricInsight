import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Grid, 
  Container, 
  Paper 
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://cricinsight-backend.vercel.app/reset-password/${token}`, 
        { newPassword }
      );
      
      toast.success(response.data.message);
      
      // Redirect to login after successful password reset
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4 
        }}
      >
        <ToastContainer />
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;