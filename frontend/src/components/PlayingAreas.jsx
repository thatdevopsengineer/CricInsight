// import React from "react";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { Box, Typography } from '@mui/material';


// const data = [
//   { name: "Category A", value: 400, label: "12%" },
//   { name: "Category B", value: 300, label: "23%" },
//   { name: "Category C", value: 300, label: "15%" },
//   { name: "Category D", value: 200, label: "54%" },
//   { name: "Category A", value: 400, label: "25%" },
//   { name: "Category B", value: 300, label: "67%" },
//   { name: "Category C", value: 300, label: "82%" },
//   { name: "Category D", value: 200, label: "11%" },
// ];

// const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//       style={{         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'        , fontSize: "14px" }}
//     >
//       {data[index].label}
//     </text>
//   );
// };

// const CustomPieChart = () => (
//   <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

//         // height: '100vh',
//         // position: 'relative',
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           width: '50%',
//           mt: 4,
//         }}
//       >
//         <Typography variant="h5" sx={{
//           fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
//           textAlign: 'center'
//         }} color="textPrimary">
//           Off Side <br /> 56%
//         </Typography>
//         <Typography variant="h5" color="textPrimary" sx={{
//           fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
//           textAlign: 'center'
//         }} align="right">
//           Leg Side <br /> 44%
//         </Typography>
//       </Box>


//   <PieChart width={550} height={550}>
//     <Pie
//       data={data}
//       cx="50%"
//       cy="50%"
//       fill="#8884d8"
//       dataKey="value"
//       labelLine={false}
//       label={renderCustomLabel}
//     >
//       {data.map((entry, index) => (
//         <Cell key={`cell-${index}`} fill={entry.color || "#41980A"} />
//       ))}
//     </Pie>
//     {/* <Tooltip /> */}
//   </PieChart>

//   {/* Playing Areas Heading */}
//   <Typography variant="h6" sx={{
//         fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
//       }}>
//         Playing Areas
//       </Typography>
    

//   </Box>
// );

// export default CustomPieChart;

import React from 'react';
import { Box, Typography } from '@mui/material';

const PlayingAreas = () => {
  const sectors = [
    'B',
    'W',
    'Mid Wicket', 
    'Mid on', 
    'Mid off', 
    'Covers', 
    'Point', 
    'Third man', 
    'Fine Leg',
    'Square Leg'
  ];

  return (
    <Box 
      sx={{
        width: '500px', 
        height: '500px', 
        borderRadius: '50%', 
        backgroundColor: '#0ba70e',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        marginTop:  15
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
          // mt: 4,
        }}
      >
        <Typography variant="h6" sx={{
          fontWeight: '500',fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          textAlign: 'center'
        }} color="white">
          Off Side <br /> 56%
        </Typography>
        <Typography variant="h6" color="white" sx={{
          fontWeight: '500', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          textAlign: 'center'
        }} align="right">
          Leg Side <br /> 44%
        </Typography>
      </Box>

      {sectors.map((sector, index) => {
        const angle = (index * 45) - 90; // Start from top
        const radius = '220px';
        
        return (
          <React.Fragment key={sector}>
            {/* Sector Dividing Line */}
            <Box
              sx={{
                position: 'absolute',
                width: '1px',
                height: '500px',
                backgroundColor: 'white',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center'
              }}
            />

            {/* Sector Start Label */}
            {/* <Typography 
              sx={{
                position: 'absolute',
                transform: `rotate(${angle}deg) translate(${radius}) rotate(-${angle}deg)`,
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontSize: '12px',
                textAlign: 'center'
              }}
            >
              {`${index + 1}. ${sector}`}
            </Typography> */}

            {/* End Sector Label (positioned in the middle of the sector) */}
            <Typography 
              sx={{
                position: 'absolute',
                transform: `rotate(${angle + 22.5}deg) translate(${parseInt(radius) * 0.6}px) rotate(-${angle + 22.5}deg)`,
                fontWeight: 'bold',
                color: 'white',
                fontSize: '14px'
              }}
            >
              {sector}
            </Typography>
          </React.Fragment>
        );
      })}
      
      {/* Pitch/Wicket Representation */}
      <Box 
        sx={{
          width: '20px', 
          height: '100px', 
          backgroundColor: '#c3aa25',
          position: 'absolute',
          transform: 'rotate(0deg)'
        }}
      />
    </Box>
    
  );
};

export default PlayingAreas;