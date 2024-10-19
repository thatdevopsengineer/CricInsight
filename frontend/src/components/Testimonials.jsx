import React, { useState, useRef } from 'react';
import { Box, Typography, Avatar, Card, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Melvin Lamberty',
    role: 'Right Handed Batsman',
    image: '/api/placeholder/40/40',
    rating: 4,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Sandhya Mer',
    role: 'Left Handed Batsman',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'Batting Alrounder',
    image: '/api/placeholder/40/40',
    rating: 3,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'Left Handed Batsman',
    image: '/api/placeholder/40/40',
    rating: 5,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
  {
    name: 'Felix Thönnessen',
    role: 'Right Handed Batsman',
    image: '/api/placeholder/40/40',
    rating: 4,
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
  },
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <MotionBox 
      ref={ref}
      sx={{ textAlign: 'center', py: 8, px: 2, mx: 4, mt : 4 }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <MotionTypography 
        variant="body" 
        color="#030D40" 
        sx={{fontWeight: 'bold'}}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Testimonials
      </MotionTypography>
      <MotionTypography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        What Our Customer Says?
      </MotionTypography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
        <IconButton onClick={handlePrev} sx={{ color: '#030D40' }}>
          <ChevronLeft size={40} />
        </IconButton>

        <AnimatePresence mode="wait">
          <Box sx={{ display: 'flex', gap: 4, mx: 4 }}>
            {[-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + testimonials.length) % testimonials.length;
              const testimonial = testimonials[index];
              return (
                <MotionCard
                  key={`${index}-${offset}`}
                  sx={{
                    width: 300,
                    p: 3,
                    textAlign: 'left',
                    zIndex: offset === 0 ? 2 : 1,
                    boxShadow: 5
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: offset === 0 ? 1 : 0.7, 
                    scale: offset === 0 ? 1.1 : 1,
                    x: offset * 20 // Slight horizontal offset
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <MotionTypography 
                    variant="h4" 
                    color="#030D40" 
                    sx={{ mb: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "
                  </MotionTypography>
                  <MotionBox 
                    sx={{ display: 'flex', mb: 2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} color={i < testimonial.rating ? 'gold' : 'gray'}>
                        ★
                      </Typography>
                    ))}
                  </MotionBox>
                  <MotionTypography 
                    variant="body2" 
                    sx={{ mb: 2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {testimonial.quote}
                  </MotionTypography>
                  <MotionBox 
                    sx={{ display: 'flex', alignItems: 'center' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Avatar src={testimonial.image} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </MotionBox>
                </MotionCard>
              );
            })}
          </Box>
        </AnimatePresence>

        <IconButton onClick={handleNext} sx={{ color: '#030D40' }}>
          <ChevronRight size={40} />
        </IconButton>
      </Box>

      <MotionBox 
        sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
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
      </MotionBox>
    </MotionBox>
  );
};

export default TestimonialSlider;