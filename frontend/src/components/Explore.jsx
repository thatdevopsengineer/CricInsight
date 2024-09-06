import React from 'react';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const ExploreButton = styled(Button)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  fontSize: '18px',
  fontFamily: 'sans-serif',
  padding: '12px 24px',
  backgroundColor: '#f9fafb', 
  borderRadius: '9999px',
  border: '2px solid #f9fafb', 
  overflow: 'hidden',
  transition: 'color 0.3s ease',
  zIndex: 10,
  textTransform: 'none',
  '&:hover': {
    color: '#f9fafb',
    backgroundColor: '#f9fafb',
  },
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    borderRadius: '9999px',
    backgroundColor: '#10b981', 
    zIndex: -10,
    transition: 'left 0.7s ease, width 0.7s ease, transform 0.7s ease',
  },
  '&:hover::before': {
    left: 0,
    width: '100%',
    transform: 'scale(1.5)',
  },
  '&:hover .rotate-icon': { 
    transform: 'rotate(90deg)', 
  },
});

const SvgIconWrapper = styled(Box)({
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #374151', // gray-700
  borderRadius: '9999px',
  padding: '8px',
  transition: 'transform 0.3s ease, background-color 0.3s ease, border 0.3s ease',
  transform: 'rotate(45deg)', // Initial rotation
});

const Explore = () => {
  return (
    <ExploreButton>
      Explore
      <SvgIconWrapper className="rotate-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" fill="none" width="16" height="19">
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            fill="#1F2937" // gray-800
          />
        </svg>
      </SvgIconWrapper>
    </ExploreButton>
  );
};

export default Explore;
