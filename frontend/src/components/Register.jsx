import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CircularProgressWithLabel from "@mui/material/CircularProgress";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (field, value) => {
    switch (field) {
      case "firstName":
        setFirstName(value);
        setErrors({ ...errors, firstName: "" });
        break;
      case "lastName":
        setLastName(value);
        setErrors({ ...errors, lastName: "" });
        break;
      case "email":
        setEmail(value);
        setErrors({ ...errors, email: "" });
        break;
      case "password":
        setPassword(value);
        setErrors({ ...errors, password: "" });
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrors({ ...errors, confirmPassword: "" });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!validator.isAlpha(firstName)) {
      validationErrors.firstName = "First name should contain only alphabets.";
    }

    if (!validator.isAlpha(lastName)) {
      validationErrors.lastName = "Last name should contain only alphabets.";
    }

    if (!validator.isEmail(email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!validator.isLength(password, { min: 8 })) {
      validationErrors.password = "Passwords must have at least 8 characters.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$]).{8,}$/;
    if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must have at least one uppercase letter, one number, and the special symbol $.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword =
        "Passwords do not match. Please try again.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    axios
      .post("http://localhost:3001/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((result) => {
        setLoading(false);
        if (result.data === "Already registered") {
          toast.warning("E-mail already registered! Please Login to proceed.");
        } else {
          toast.success("Registered successfully!", {});
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        setErrors({});
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      });
  };



  return (
    <div>
      <ToastContainer />
      <Grid
        container
        component="main"
        sx={{
          minHeight: "110vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: 'center',
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif"
        }}
      >
        <Grid item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square>
          <Box
            sx={{

              px: { xs: 3, sm: 6, md: 12 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: 'center',
              minHeight: { xs: '80vh', sm: '100vh', md: '110vh' }
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: "32px",
                position: "relative",
                textAlign: "flex-start",
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
              }}
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
                  width: "95%",
                  background:
                    "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
                  borderRadius: "5px",
                  marginLeft: '2%'
                }}
              />
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 4 }}
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
                    value={firstName}
                    onChange={(event) =>
                      handleFieldChange("firstName", event.target.value)
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    sx={{
                      "& label.Mui-focused": {
                        color: "#030947",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4",
                        },
                        "&:hover fieldset": {
                          borderColor: "#030947",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#030947",
                        },
                      },
                    }}
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
                    value={lastName}
                    onChange={(event) =>
                      handleFieldChange("lastName", event.target.value)
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    sx={{
                      "& label.Mui-focused": {
                        color: "#030947",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4",
                        },
                        "&:hover fieldset": {
                          borderColor: "#030947",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#030947",
                        },
                      },
                    }}
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
                    value={email}
                    onChange={(event) =>
                      handleFieldChange("email", event.target.value)
                    }
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      "& label.Mui-focused": {
                        color: "#030947",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4",
                        },
                        "&:hover fieldset": {
                          borderColor: "#030947",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#030947",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(event) =>
                      handleFieldChange("password", event.target.value)
                    }
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{
                      "& label.Mui-focused": {
                        color: "#030947",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4",
                        },
                        "&:hover fieldset": {
                          borderColor: "#030947",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#030947",
                        },
                      },
                    }}
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      handleFieldChange("confirmPassword", event.target.value)
                    }
                    sx={{
                      "& label.Mui-focused": {
                        color: "#030947",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#c4c4c4",
                        },
                        "&:hover fieldset": {
                          borderColor: "#030947",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#030947",
                        },
                      },
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={
                  loading ? (
                    <CircularProgressWithLabel size={18} color="inherit" />
                  ) : (
                    <KeyboardDoubleArrowRightIcon />
                  )
                }
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "#030947",
                  borderRadius: 5,
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  fontWeight: "bold",
                  textTransform: 'none',
                  "&:hover": {
                    backgroundColor: "#030947",
                    color: "#fff",
                  },
                  "&:active": {
                    backgroundColor: "#030947",
                    color: "#fff",
                  },
                  "&:disabled": {
                    backgroundColor: "#030947",
                    color: "#fff",
                  },
                }}
              >
                {loading ? "Signing Up" : "Sign Up"}
              </Button>

              <Grid container justifyContent="center">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{
                      textTransform: "none",
                      color: "#000000",
                      textDecoration: "none",
                    }}
                  >
                    Already have an account?{" "}
                    <span style={{
                      color: "#030947", fontWeight: 'bold', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    }}>Login</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "linear-gradient(90deg, #030947, #12152E, #1F1F1F)",
            backgroundSize: "cover",
            paddingTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: { sm: "50vh", md: "110vh" },
          }}
        >
          <img
            src="./assets/logo.png"
            alt="Logo"
            style={{
              width: "100%",
              maxWidth: "400px",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
