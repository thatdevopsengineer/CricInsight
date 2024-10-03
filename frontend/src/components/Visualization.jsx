import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";
import axios from "axios";
import CustomButton from "./CustomButton";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const data = [
  { name: "Cut", value: 433, color: "#332971" },
  { name: "Pull", value: 173, color: "#46399c" },
  { name: "Cover Drive", value: 1040, color: "#0d0a1c" },
  { name: "Straight Drive", value: 543, color: "#201a47" },
  { name: "Flick", value: 1407, color: "#5948c6" },
  // { name: "Sweep", value: 24, color: "#6c58f1" },
];

const Visualization = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dates, setDates] = useState([]);
  const [shotsData, setShotsData] = useState({
    date: new Date().toISOString(), 
    email: localStorage.getItem("userEmail"),
    shots: [],
  });

  useEffect(() => {
    const fetchDates = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      try {
        const response = await axios.get(`http://localhost:3001/api/user/shots?email=${email}`);
        setDates(response.data);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const saveShotsData = async () => {
    try {
      const total = data.reduce((sum, entry) => sum + entry.value, 0);

      const updatedShots = data.map((shot) => ({
        name: shot.name,
        percentage: ((shot.value / total) * 100).toFixed(2),
      }));

      const updatedShotsData = {
        ...shotsData,
        date: new Date().toISOString(), 
        shots: updatedShots,
      };

      console.log("Sending shots data:", updatedShotsData);

      if (!updatedShotsData.date || !updatedShotsData.email) {
        console.error("Date or email missing");
        return;
      }

      const response = await axios.post("http://localhost:3001/api/shots", updatedShotsData);
      console.log("Shots data saved successfully:", response.data);
      toast.success("Data Saved Successfully!", {});
    } catch (error) {
      toast.error("Error saving shots data.");
      console.error("Error saving shots data:", error);
    }
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const percentage = Math.round((value / total) * 100);
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#333"
        textAnchor="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <Box
      sx={{
        px: "20px",
        py: "35px",
        borderRadius: "8px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <ToastContainer />
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Shots Visualization
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
          <Grid container spacing={2} justifyContent="center">
            {data.map((shot) => (
              <Grid item key={shot.name}>
                <button
                  style={{
                    borderRadius: "20px",
                    borderColor: shot.color,
                    color: shot.color,
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "5px 15px",
                  }}
                >
                  {shot.name}
                </button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="date-label">Date</InputLabel>
            <Select
              sx={{
                borderRadius: "10px",
                height: "50px",
              }}
              labelId="date-label"
              id="date"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Date"
            >
              {dates.slice().reverse().map((item) => { 
                const formattedDate = new Date(item.date).toLocaleString("en-US", {
                  month: "short",  
                  day: "2-digit",  
                  year: "numeric", 
                  hour: "2-digit", 
                  minute: "2-digit",
                  hour12: true,    
                });

                return (
                  <MenuItem key={item.date} value={item.date}>
                    {formattedDate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} md={2}>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <CustomButton
              title="Save"
              onClick={saveShotsData}
              IconComponent={FileDownloadOutlinedIcon}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ paddingTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <BarChart width={600} height={400} data={data} borderRadius="20">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" radius={[25, 25, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </Grid>

        <Grid item xs={12} md={4}>
          <PieChart width={275} height={225}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={1}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <PieChart width={275} height={225}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={43}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Visualization;
