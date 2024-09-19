import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import CustomButton from "./CustomButton";
import Lottie from 'react-lottie';
import loaderAnimation from './Loader.json'; 
import axios from 'axios'; // Import axios
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

// import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const VideoInsight = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [blurred, setBlurred] = useState(false); 
  const videoRef = useRef(null);
  const [Id, setId] = useState(null);  
  const canvasRef = useRef(null);
  const [videoId, setVideoId] = useState(null); // State to store video ID

  const userEmail = localStorage.getItem('userEmail');

  const [videoData, setVideoData] = useState({
    // videoId: Id,      // Initialize videoId
    email: userEmail,
    // shots: []        // Add shots array if needed
  });


  const handleVideoUpload = (file) => {
    if (file) {
      setLoading(true);
      setBlurred(true);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false);
      // const uniqueId = uuidv4(); // Generate a unique ID for the video
      // setId(uniqueId);
      // setVideoId(uniqueId);
      // console.log(uniqueId)
      // Optionally, you can upload the video to the server here and get the server-side ID
    }
  };

  const onDrop = (acceptedFiles) => {
    handleVideoUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*",
    onDrop,
    noClick: true, 
  });

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleUndo = () => {
    console.log("Undo clicked");
  };

  const handleRedo = () => {
    console.log("Redo clicked");
  };

  const handleCut = () => {
    console.log("Cut clicked");
  };

  const handleAdd = () => {
    console.log("Add clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  // New function to handle "Done" button click
  const handleDone = async () => {
    // setVideoData(prevData => ({
    //   ...prevData,
    //   videoId: videoId
    // }));
    
    try {
      console.log('Sending video data:', videoData); // Log the video data to verify it's correct
      const response = await axios.post('http://localhost:3001/api/videos', videoData);
      console.log('Video data saved:', response.data);
    } catch (error) {
      console.error('Error saving video data:', error);
    }
  };
  

  useEffect(() => {
    const drawFrames = () => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const frameCount = Math.floor(videoRef.current.duration / 0.5);
        const interval = 0.5;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        let currentFrame = 0;

        const drawFrame = () => {
          if (currentFrame <= frameCount) {
            videoRef.current.currentTime = currentFrame * interval;
            videoRef.current.onseeked = () => {
              // Draw frame
              context.drawImage(
                videoRef.current,
                (currentFrame * canvas.width) / frameCount,
                30,
                canvas.width / frameCount,
                canvas.height - 30
              );

              // Draw time indicator for each second
              if (currentFrame % 2 === 0) {
                context.font = "12px Arial";
                context.fillStyle = "black";
                context.fillText(
                  `${currentFrame / 2}s`,
                  (currentFrame * canvas.width) / frameCount,
                  20
                );
              }

              currentFrame++;
              drawFrame();
            };
          } else {
            setLoading(false);
            setBlurred(false);
          }
        };

        drawFrame();
      }
    };

    if (videoSrc) {
      videoRef.current.onloadedmetadata = () => {
        setVideoDuration(videoRef.current.duration);
        drawFrames();
      };

      videoRef.current.ontimeupdate = () => {
        setVideoCurrentTime(videoRef.current.currentTime);
      };
    }
  }, [videoSrc]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      sx={{ padding: 3 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        sx={{ filter: blurred ? "blur(8px)" : "none" }} 
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={1}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            width="100%"
            alignItems="center"
          >
            <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
              Upload Videos
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" width="100%">
            <input
              accept="video/*"
              style={{ display: "none" }}
              id="video-upload"
              type="file"
              onChange={(e) => handleVideoUpload(e.target.files[0])}
            />
            <CustomButton
              title={videoSrc ? "Done" : "Upload"}
              IconComponent={FileUploadOutlinedIcon} // Pass the custom icon here
              onClick={() => {
                if (videoSrc) {
                  handleDone(); // Trigger handleDone when "Done" is clicked
                } else {
                  document.getElementById("video-upload").click();
                }
              }}
            />
          </Box>
        </Box>

        <Box
          mt={3}
          component="video"
          ref={videoRef}
          width="100%"
          height="50%"
          bgcolor="#d3d3d3"
          controls
          src={videoSrc}
        />
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton onClick={handleRewind}>
            <FastRewindIcon />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={handleFastForward}>
            <FastForwardIcon />
          </IconButton>
          <IconButton onClick={handleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Box>

        {/* Video Editor code starts here */}
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={2}
          borderTop="1px solid #ccc"
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            width="100%"
            alignItems="center"
          >
            <IconButton onClick={handleUndo}>
              <UndoIcon />
            </IconButton>
            <IconButton onClick={handleRedo}>
              <RedoIcon />
            </IconButton>
            <IconButton onClick={handleCut}>
              <ContentCutIcon />
            </IconButton>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
          width="100%"
          height="100px"
          borderTop="1px solid #ccc"
          position="relative"
          {...getRootProps()}
          overflow="auto" // Enable scrolling
          sx={{
            borderRadius: 1,
            backgroundColor: isDragActive ? '#f0f0f0' : '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap', // Prevent wrapping of content inside the box
          }}
        >
          <input {...getInputProps()} />
          {videoSrc ? (
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {isDragActive
                ? "Drop the video here ..."
                : "Drag and drop a video file here, or click to select one"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Loader animation */}
      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
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
              speed: 10 
            }}
            height={100}
            width={100}
          />
          <Typography variant="h6" align="center">
            Processing video...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoInsight;
