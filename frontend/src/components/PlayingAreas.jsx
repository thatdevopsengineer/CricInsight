
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import Lottie from 'react-lottie';
import loaderAnimation from './Loader.json';
import { toast } from 'react-toastify';

const PlayingAreas = () => {
  const [sectors, setSectors] = useState([
    'B',
    'W',
    'Mid Wicket (0%)',
    'Mid on (0%)',
    'Mid off (0%)',
    'Covers (0%)',
    'Point (0%)',
    'Third man (0%)',
    'Fine Leg (0%)',
    'Square Leg (0%)',
  ]);
  const [offSidePercentage, setOffSidePercentage] = useState(0);
  const [legSidePercentage, setLegSidePercentage] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAreaPercentages = async () => {
      try {
        const response = await axios.get('https://cric-insight-blush.vercel.app/api/video/last-analysis');
        if (response.data && response.data.ShotPercentages) {
          const shotPercentages = response.data.ShotPercentages;

          const straightDrivePercentage = shotPercentages.straight_drive || 0;
          const midOffPercentage = (straightDrivePercentage / 2).toFixed(2);
          const midOnPercentage = (straightDrivePercentage / 2).toFixed(2);

          const calculatedOffSidePercentage = (
            parseFloat(shotPercentages.cut || 0) +
            parseFloat(shotPercentages.cover_drive || 0) +
            parseFloat(midOffPercentage) +
            parseFloat(shotPercentages.third_man || 0)
          ).toFixed(2);

          const calculatedLegSidePercentage = (
            parseFloat(midOnPercentage) +
            parseFloat(shotPercentages.flick || 0) +
            parseFloat(shotPercentages.pull || 0) +
            parseFloat(shotPercentages.fine_leg || 0)
          ).toFixed(2);

          setOffSidePercentage(calculatedOffSidePercentage);
          setLegSidePercentage(calculatedLegSidePercentage);

          const updatedSectors = [
            'B',
            'W',
            `Mid Wicket (${shotPercentages.flick || 0}%)`,
            `Mid on (${midOnPercentage}%)`,
            `Mid off (${midOffPercentage}%)`,
            `Covers (${shotPercentages.cover_drive || 0}%)`,
            `Point (${shotPercentages.cut || 0}%)`,
            `Third man (${shotPercentages.third_man || 0}%)`,
            `Fine Leg (${shotPercentages.fine_leg || 0}%)`,
            `Square Leg (${shotPercentages.pull || 0}%)`,
          ];

          setSectors(updatedSectors);
        }
      } catch (error) {
        console.error('Error fetching area percentages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreaPercentages();
  }, []);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box>
        <Typography
          variant="h5"
          align="center"
          sx={{
            marginY: "30px", fontWeight: "bold", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          Playing Areas
        </Typography>
      </Box>
      <Box
        sx={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'green',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <Box
            position="absolute"
            top="25%"
            left="25%"
            transform="translate(-50%, -50%)"
            bgcolor="white"
            p={2}
            borderRadius={2}
          >
            <Lottie
              options={{
                animationData: loaderAnimation,
                loop: true,
                autoplay: true,
                speed: 10,
              }}
              height={100}
              width={100}
            />
            <Typography variant="h6" align="center">
              Loading Areas...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: '500',
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  textAlign: 'center',
                }}
                color="white"
              >
                Off Side <br /> {offSidePercentage}%
              </Typography>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: '500',
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  textAlign: 'center',
                }}
                align="right"
              >
                Leg Side <br /> {legSidePercentage}%
              </Typography>
            </Box>

            {sectors.map((sector, index) => {
              const angle = index * 45 - 90; // Start from top
              const radius = '220px';

              return (
                <React.Fragment key={sector}>
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '1px',
                      height: '500px',
                      backgroundColor: 'white',
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: 'center',
                    }}
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      transform: `rotate(${angle + 22.5}deg) translate(${parseInt(radius) * 0.6}px) rotate(-${angle + 22.5
                        }deg)`,
                      fontWeight: 'bold',
                      color: 'white',
                      fontSize: '11px',
                    }}
                  >
                    {sector}
                  </Typography>
                </React.Fragment>
              );
            })}

            <Box
              sx={{
                width: '20px',
                height: '100px',
                backgroundColor: '#c3aa25',
                position: 'absolute',
                transform: 'rotate(0deg)',
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default PlayingAreas;