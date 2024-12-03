import "bootstrap/dist/css/bootstrap.min.css";
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
import { Divider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgressWithLabel from "@mui/material/CircularProgress";
import GoogleIcon from "/google-icon.svg";
import FacebookIcon from "/facebook-icon.svg";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        setLoading(false);
        if (result.data === "Success") {
          toast.success("Login successfully!", {});
          localStorage.setItem("userEmail", email);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          toast.error("Incorrect credentials! Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      });
  };


  const handleFacebookLogin = () => {
    // Implement Facebook login functionality here
  };

  const onSuccess = (response) => {
    const googleToken = response.credential;

    axios.post('http://localhost:3001/google-login', { token: googleToken })
      .then((res) => {
        const userEmail = res.data.email;

        localStorage.setItem('userEmail', userEmail);

        toast.success('Google login successful!');
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      })
      .catch((error) => {
        toast.error('Google login failed. Please try again.');
      });
  };

  const onFailure = (error) => {
    console.error('Google login failed:', error);
    toast.error('Google login failed. Please try again.');
  };


  return (
    <Grid
      container
      sx={{
        minHeight: "110vh",
        overflow: "hidden",
      }}
    >
      <ToastContainer />
      {/* Left Section */}
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
          minHeight: { sm: "50vh", md: "110v" },
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

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6, md: 12 },
          minHeight: { sm: "60vh", md: "110v" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            // maxWidth: "400px",
            mx: "auto",
            maxWidth: { sm: '90%', md: '90%' },


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
            Login
            <Box
              component="span"
              sx={{
                position: "absolute",
                left: 0,
                bottom: -4,
                height: 6,
                width: 90,
                background:
                  "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
                borderRadius: "5px",
              }}
            />
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              sx={{
                mb: 2, mt: 4 ,
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
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
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
              sx={{ mb: 2,
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

            <Grid container justifyContent="flex-end">
              <Link
                href="/forgot-password"
                variant="body2"
                sx={{
                  textTransform: "none",
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Forget Password?
              </Link>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={
                loading ? (
                  <CircularProgressWithLabel size={18} sx={{ color: "#fff" }} />
                ) : (
                  <KeyboardDoubleArrowRightIcon />
                )
              }
              disabled={loading}
              sx={{
                mt: 1,
                mb: 1,
                background: "#030947",
                borderRadius: 5,
                textTransform: "none",
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

                fontWeight: "bold",

                "&:hover": {
                  backgroundColor: "#030947",
                  color: "#fff",
                },
              }}
            >
              {loading ? "Logging in" : "Login"}
            </Button>

            <Divider sx={{ my: 1 }}>
              <Typography variant="body2" color="textSecondary">
                or
              </Typography>
            </Divider>

            <Box
              sx={{
                display: "flex",
                flexDirection: { lg: "row", md: "column", sm: "column", xs: "column" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  alignItems: "center",
                  minWidth: '260px',
                  color: "rgba(0, 0, 0)",
                  backgroundColor: "#fff",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },

                }}
              >
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onFailure}
                  sx={{
                    height: "40px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Box>

              <Button
                variant="outlined"
                startIcon={
                  <img
                    src={FacebookIcon}
                    alt="Facebook logo"
                    style={{ width: "20px", height: "20px" }}
                  />
                }
                onClick={handleFacebookLogin}
                sx={{
                  flex: 1,
                  height: "40px",
                  minWidth: '260px',
                  textTransform: "none",
                  color: "rgba(0, 0, 0)",
                  backgroundColor: "#fff",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                  },
                }}
              >
                Continue with Facebook
              </Button>
            </Box>



            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    textTransform: "none",
                    color: "#000",
                    textDecoration: "none",
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{
                    color: "#030947", fontWeight: "bold", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                  }}>Sign Up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

    </Grid>

  );
};

export default Login;
