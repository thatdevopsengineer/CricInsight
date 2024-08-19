import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList  } from 'recharts';

const data = [
  { name: 'Cover Drive', value: 14, color: '#F94144' }, 
  { name: 'Cut', value: 7, color: '#F8961E' },          
  { name: 'Flick', value: 20, color: '#2D9CDB' },       
  { name: 'Sweep', value: 11, color: '#030947' },        
  { name: 'Pull', value: 18, color: '#90BE6D' },        
  { name: 'Others', value: 30, color: '#F3722C' },      
];

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

const Visualization = () => {
  return (
    <Box sx={{ px: '20px', py: '35px', borderRadius: '8px', fontFamily: "Poppins, sans-serif" }}>
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

      <Grid container spacing={4} sx={{ paddingTop: '20px' }}>
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

        <Grid item xs={12} md={4} >
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
