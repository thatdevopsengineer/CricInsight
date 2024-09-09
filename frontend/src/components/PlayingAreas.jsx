import React from 'react';
import { Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

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
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
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
    </Box>
  );
};

export default PlayingAreas;
