import React, { useState } from 'react';
import { Box, Typography, Avatar, Card, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Melvin Lamberty',
    role: 'MANAGER',
    image: '/api/placeholder/40/40',
    rating: 4,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Sandhya Mer',
    role: 'MANAGER',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'MANAGER',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'MANAGER',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'MANAGER',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2, mx:4 }}>
      <Typography variant="body" color="#030D40" sx={{fontWeight: 'bold'}}>
      Testamonials
      </Typography>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        What Our Customer Says?
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        <IconButton onClick={handlePrev} sx={{ color: '#030D40' }}>
          <ChevronLeft size={40} />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 4, mx: 4 }}>
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + testimonials.length) % testimonials.length;
            const testimonial = testimonials[index];
            return (
              <Card
                key={index}
                sx={{
                  width: 300,
                  p: 3,
                  textAlign: 'left',
                  transform: offset === 0 ? 'scale(1.1)' : 'scale(1)',
                  zIndex: offset === 0 ? 2 : 1,
                  opacity: offset === 0 ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                  boxShadow: 5
                }}
              >
                <Typography variant="h4" color="#030D40" sx={{ mb: 2 }}>
                  "
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Typography key={i} color={i < testimonial.rating ? 'gold' : 'gray'}>
                      ★
                    </Typography>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {testimonial.quote}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={testimonial.image} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>

        <IconButton onClick={handleNext} sx={{ color: '#030D40' }}>
          <ChevronRight size={40} />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        {testimonials.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#030D40' : '#D9D9D9',
              mx: 0.5,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialSlider;