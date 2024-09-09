import React from 'react';
import { Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// 8 data attributes
const data = [
  { value: 12 }, 
  { value: 12},          
  { value: 12 },       
  { value: 12 },        
  { value: 12},        
  { value: 12},     
  { value: 12 }, 
  { value: 12 },    
];

// Custom function to render labels inside the pie chart
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Position label towards the middle of the slice
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180)); // Calculate x position based on angle
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180)); // Calculate y position based on angle

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="16px"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const PlayingAreas = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Pie Chart */}
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // outerRadius={150}
          // innerRadius={70}
          fill="#8884d8"
          dataKey="value"
          labelLine={false} // Remove label line to keep it clean
          label={renderCustomLabel} // Custom label render function
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={'#41980A'} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
};

export default PlayingAreas;
