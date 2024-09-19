import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData, clearProfileData } from '../../../backend/profileSlice';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#030947',
    },
  },
});

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [initialProfileData, setInitialProfileData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      axios
        .get(`http://localhost:3001/user?email=${userEmail}`)
        .then((response) => {
          const { email, name, password } = response.data;
          const [firstName, lastName] = name.split(' ');
          const fetchedData = { firstName, lastName, email, password };
          setInitialProfileData(fetchedData); // Store initial profile data
          dispatch(setProfileData(fetchedData));
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
        });
    }
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setProfileData({ ...profileData, [name]: value }));
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are any changes
    if (JSON.stringify(profileData) === JSON.stringify(initialProfileData)) {
      toast.warn('Edit data before saving');
      return;
    }

    let validationErrors = {};

    if (!validator.isAlpha(profileData.firstName)) {
      validationErrors.firstName = 'First name should contain only alphabets.';
    }

    if (!validator.isAlpha(profileData.lastName)) {
      validationErrors.lastName = 'Last name should contain only alphabets.';
    }

    if (!validator.isEmail(profileData.email)) {
      validationErrors.email = 'Invalid email format.';
    }

    if (!validator.isLength(profileData.password, { min: 8 })) {
      validationErrors.password = 'Passwords must have at least 8 characters.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$]).{8,}$/;
    if (!passwordRegex.test(profileData.password)) {
      validationErrors.password =
        'Password must have at least one uppercase letter, one number, and the special symbol $.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post('http://localhost:3001/updateUser', profileData)
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        toast.success('Profile updated successfully!', {});
        setInitialProfileData(profileData); // Update initial data to the latest
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile:');
      });
  };

  const handleCancel = () => {
    dispatch(setProfileData(initialProfileData)); // Reset profile data to initial state
  };

  const handleDelete = () => {
    setOpen(false);
    axios
      .delete(`http://localhost:3001/deleteUser?email=${profileData.email}`)
      .then((response) => {
        console.log('Profile deleted successfully:', response.data);
        toast.success('Profile deleted successfully!', {});
        localStorage.removeItem('userEmail');
        dispatch(clearProfileData());
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error deleting profile:', error);
        toast.error('Error deleting profile:');
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // bgcolor: 'orange',
            // pr: 40
          }}
        >
          <Typography component="h1" variant="h5" alignSelf="flex-start" fontWeight="600">
            Edit Profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <ToastContainer />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={profileData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={profileData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={profileData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={profileData.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                {/* Add other buttons or components as needed */}
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
              <Box>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
              <Button onClick={handleClickOpen} sx={{ background: '#D52728' }} variant="contained" color="error">
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{'Delete Account'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" sx={{ background: '#D52728', color: 'white' }} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default ProfileEdit;
