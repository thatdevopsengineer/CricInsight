import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { value: 13 }, 
  { value: 13},          
  { value: 13 },       
  { value: 13 },        
  { value: 13},        
  { value: 13},     
  { value: 13 }, 
  { value: 13 },    
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; 
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180)); 
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180)); 

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="16px"
    >
      {(percent * 100).toFixed(2)}%
    </text>
  );
};

const PlayingAreas = () => {
  return (
    <Box
      sx={{
        fontFamily: "Poppins, sans-serif",

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        // position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
          mt: 4,
        }}
      >
        <Typography variant="h5" sx={{fontWeight: 'bold', fontFamily: "Poppins, sans-serif", textAlign: 'center' }} color="textPrimary">
          Off Side <br /> 56%
        </Typography>
        <Typography variant="h5" color="textPrimary" sx={{fontWeight: 'bold', fontFamily: "Poppins, sans-serif", textAlign: 'center' }} align="right">
          Leg Side <br /> 44%
        </Typography>
      </Box>

      {/* Pie Chart */}
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          // cx="50%"
          // cy="50%"
          // outerRadius={150}
          // innerRadius={70}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'#41980A'} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Playing Areas Heading */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: "Poppins, sans-serif"}}>
        Playing Areas
      </Typography>
    </Box>
  );
};

export default PlayingAreas;
