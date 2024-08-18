import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Cover Drive', value: 15, color: '#F94144' }, 
  { name: 'Cut', value: 9, color: '#F8961E' },          
  { name: 'Flick', value: 33, color: '#2D9CDB' },       
  { name: 'Sweep', value: 5, color: '#030947' },        
  { name: 'Pull', value: 18, color: '#90BE6D' },        
  { name: 'Others', value: 20, color: '#F3722C' },      
];

const Visualization = () => {
  return (
    <Box sx={{ px: '20px', py: '30px' ,borderRadius: '8px' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: '20px', color: '#34495e', fontWeight: 'bold' }}>
        Shots Visualization
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '20px' }}>
        {data.map((shot) => (
          <Grid item key={shot.name}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '20px',
                borderColor: shot.color,
                color: shot.color,
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '5px 15px',
              }}
            >
              {shot.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ paddingTop: '20px', minHeight: '80vh' }}>
        <Grid item xs={12} md={8}>
          <BarChart width={600} height={400} data={data} borderRadius="20">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </Grid>

        <Grid item xs={12} md={4} >
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
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
