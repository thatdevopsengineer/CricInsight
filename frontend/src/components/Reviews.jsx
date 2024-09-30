import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProfileData, clearProfileData, } from "../../../backend/profileSlice";

const FeedbackForm = () => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    dispatch(setProfileData(initialProfileData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const categories = [
    "User profiling experience",
    "Ease of Uploading Videos",
    "Accuracy of Videos Analysis",
    "Adaptive Learning Effectiveness",
    "Payment Gateway Experience",
    "Correctness of Shot Classification",
    "Accuracy of Field Area Calculations",
    "Ease of Interpreting Shot Statistics",
    "AI Assistant Accuracy in Responding to Queries",
  ];

  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [initialProfileData, setInitialProfileData] = useState({});

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:3001/user?email=${userEmail}`)
        .then((response) => {
          const { email, name } = response.data;
          const fetchedData = { name, email };
          setInitialProfileData(fetchedData);
          dispatch(setProfileData(fetchedData));
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [dispatch]);

  const ratings = [
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Unsatisfied",
    "Very unsatisfied",
  ];

  return (
    <Box sx={{ p: 3, width: "90%", mx: "auto", mt: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
        Reviews and Feedback
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
        Please take a few moments to complete this form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Name"
            name="Name"
            disabled
            value={profileData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            disabled
            name="Email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          Overall satisfaction
        </Typography>

        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ background: "#F0F0F0" }}></TableCell>
                {ratings.map((rating) => (
                  <TableCell
                    sx={{ fontWeight: "bold", background: "#F0F0F0" }}
                    key={rating}
                    align="center"
                  >
                    {rating}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold", background: "#F0F0F0" }}
                  >
                    {category}
                  </TableCell>
                  {ratings.map((rating) => (
                    <TableCell key={rating} align="center">
                      <Radio value={rating} onChange={handleInputChange} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="How can we improve our service?"
          name="feedback"
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Anything which we should add in the system?"
          name="feedback"
          onChange={handleInputChange}
          margin="normal"
        />

        <Button
          variant="outlined"
          sx={{
            mr: 2,
            mt: 2,
            color: "#030947",
            border: "1px solid #030947",
            "&:hover": { color: "#030947", border: "1px solid #030947" },
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: "#030947",
            "&:hover": { bgcolor: "#030947" },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
