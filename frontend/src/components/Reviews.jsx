import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProfileData } from "../../../backend/profileSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    overallSatisfaction: [],
    improvementSuggestions: {
      serviceImprovement: '',
      systemAdditions: ''
    }
  });

  const categories = [
    "User profiling experience",
    "Ease of Uploading Videos",
    "Accuracy of Videos Analysis",
    "Adaptive Learning Effectiveness",
    "Payment Gateway Experience",
    "Correctness of Shot Classification",
    "Accuracy of Field Area Calculations",
    "Ease of Interpreting Shot Statistics",
    "AI Assistant Accuracy in Responding to Queries"
  ];

  const ratings = [
    "Very satisfied",
    "Satisfied",
    "Neutral",
    "Unsatisfied",
    "Very unsatisfied",
  ];

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      axios
        .get(`http://localhost:3001/user?email=${userEmail}`)
        .then((response) => {
          const { email, name } = response.data;
          setFormData(prev => ({
            ...prev,
            name,
            email
          }));
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
          toast.error("Failed to fetch user data");
        });
    }
  }, []);

  const handleRadioChange = (category, rating) => {
    setFormData(prev => {
      const existingRatingIndex = prev.overallSatisfaction.findIndex(
        item => item.category === category
      );

      let newSatisfaction = [...prev.overallSatisfaction];
      if (existingRatingIndex !== -1) {
        newSatisfaction[existingRatingIndex] = { category, rating };
      } else {
        newSatisfaction.push({ category, rating });
      }

      return {
        ...prev,
        overallSatisfaction: newSatisfaction
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'serviceImprovement' || name === 'systemAdditions' || name === 'systemIssues' || name === 'systemFrustrations'
      || name === 'systemUsability' || name === 'platformNeeds' || name === 'professionalCapacity'
    ) {
      setFormData(prev => ({
        ...prev,
        improvementSuggestions: {
          ...prev.improvementSuggestions,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.overallSatisfaction.length !== categories.length) {
      toast.warn("Please rate all categories");
      return;
    }

    if (!formData.improvementSuggestions.serviceImprovement ||
      !formData.improvementSuggestions.systemIssues ||
      !formData.improvementSuggestions.systemFrustrations ||
      !formData.improvementSuggestions.platformNeeds ||
      !formData.improvementSuggestions.systemUsability ||
      !formData.improvementSuggestions.professionalCapacity ||
      !formData.improvementSuggestions.systemAdditions) {
      toast.warn("Please provide improvement suggestions");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/submit-feedback', formData);

      toast.success(response.data.message || "Feedback submitted successfully!");

      setFormData({
        name: profileData.name,
        email: profileData.email,
        overallSatisfaction: [],
        improvementSuggestions: {
          serviceImprovement: '',
          systemAdditions: ''
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while saving feedback');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profileData.name,
      email: profileData.email,
      overallSatisfaction: [],
      improvementSuggestions: {
        serviceImprovement: '',
        systemAdditions: '',
        systemFrustrations: '',
        systemIssues: '',
        systemUsability: '',
        platformNeeds: '',
        professionalCapacity: ''
      }
    });
  };

  return (
    <Box sx={{ p: 3, width: "90%", mx: "auto", mt: 3 }}>
      <Typography variant="h4" sx={{
        fontWeight: "600", mb: 0.5, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}>
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
          sx={{
            fontWeight: "bold", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
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
                      <Radio
                        value={rating}
                        checked={
                          formData.overallSatisfaction.some(
                            item => item.category === category && item.rating === rating
                          )
                        }
                        onChange={() => handleRadioChange(category, rating)}
                      />
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
          label="In what professional capacity or industry are you using our platform?"
          name="professionalCapacity"
          value={formData.improvementSuggestions.professionalCapacity}
          onChange={handleInputChange}
          margin="normal"
        />


        <TextField
          fullWidth
          multiline
          rows={4}
          label="How can we improve our service?"
          name="serviceImprovement"
          value={formData.improvementSuggestions.serviceImprovement}
          onChange={handleInputChange}
          margin="normal"
        />


        <TextField
          fullWidth
          multiline
          rows={4}
          label="What new features would you like to see in our platform?"
          name="systemAdditions"
          value={formData.improvementSuggestions.systemAdditions}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Did you experience any performance issues like slow loading or crashes?"
          name="systemIssues"
          value={formData.improvementSuggestions.systemIssues}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="How well did our platform meet your specific professional/personal needs?"
          name="platformNeeds"
          value={formData.improvementSuggestions.platformNeeds}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="What was the most frustrating aspect of using our platform?"
          name="systemFrustrations"
          value={formData.improvementSuggestions.systemFrustrations}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="How easy or difficult was it to understand and navigate our platform?"
          name="systemUsability"
          value={formData.improvementSuggestions.systemUsability}
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

      {/* ToastContainer for react-toastify */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default FeedbackForm;