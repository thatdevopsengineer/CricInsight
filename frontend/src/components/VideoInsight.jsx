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
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});


const VideoEditor = () => {
  const [videos, setVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);
  const fileInputRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");



  const userEmail = localStorage.getItem('userEmail');

  const addToHistory = (videos) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(videos);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  const [isVideoProcessing, setIsVideoProcessing] = useState(false);

  const handleVideoUpload = (file) => {
    if (file && file.type === "video/mp4") {
      setIsVideoProcessing(true); // Set processing state
      const url = URL.createObjectURL(file);
      const newVideos = [...videos, { src: url, duration: 0 }];
      setVideos(newVideos);
      addToHistory(newVideos);
      setIsPlaying(false);
    } else {
      toast.error('Please upload an MP4 video file.');
      setIsVideoProcessing(false);
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
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setVideos(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setVideos(history[historyIndex + 1]);
    }
  };


  const handleCut = () => {
    console.log("Cut clicked");
  };

  const handleAdd = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  };

  const handleDelete = () => {
    if (currentVideoIndex !== null) {
      const newVideos = videos.filter((_, index) => index !== currentVideoIndex);
      setVideos(newVideos);
      addToHistory(newVideos);

      if (currentVideoIndex >= newVideos.length) {
        setCurrentVideoIndex(newVideos.length - 1); // Adjust index to the last video
      } else {
        setCurrentVideoIndex(currentVideoIndex); // Keep the index consistent if possible
      }
    }
  };


  const navigate = useNavigate()

  const handleDoneClick = async () => {
    try {
      setLoading(true);
      setBlurred(true);
      setUploading(true);

      // Fetch user details based on email
      const email = localStorage.getItem('userEmail');

      // Upload each video
      const uploadPromises = videos.map(async (videoFile, index) => {
        try {
          const response = await fetch(videoFile.src);
          const blob = await response.blob();

          const formattedDate = new Date().toISOString().split("T")[0];
          const fileName = `${email.replace(/\s+/g, "_")}_video_${formattedDate}_${index + 1}.mp4`;
          const key = `videos/${email.replace(/\s+/g, "_")}/${fileName}`;

          const uploadParams = {
            Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
            Key: key,
            Body: blob,
            ContentType: "video/mp4",
          };

          // Upload to S3
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);

          console.log(`Uploaded video ${index + 1}:`, key);

          // Return public video URL
          return `https://${uploadParams.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`;
        } catch (uploadError) {
          console.error(`Error uploading video ${index + 1}:`, uploadError);
          throw uploadError;
        }
      });

      const videoUrls = await Promise.all(uploadPromises);

      // Save video URLs to backend
      const backendResponse = await axios.post("http://localhost:3001/video/upload-video", {
        email: userEmail,
        videos: videoUrls.map((url) => ({
          url,
          uploadedAt: new Date(),
        })),
      });

      // Check if backend response is successful
      if (backendResponse.status === 200 || backendResponse.status === 201) {
        setUploadSuccess(true);
        setLoading(false);
        setBlurred(false);
        toast.success("Video uploaded successfully!");

        setTimeout(() => {
          navigate("/dashboard/visualization");
        }, 2000);
      } else {
        // Even if backend returns non-200 status, treat it as a partial success
        toast.warn("Videos uploaded to S3, but there might be an issue with backend recording.");
        setTimeout(() => {
          navigate("/dashboard/visualization");
        }, 5000);
      }
    } catch (err) {
      console.error("Potential upload issue:", err);

      // Check if S3 upload might have succeeded despite backend error
      if (err.response && err.response.status === 500) {
        // Specifically handle 500 error
        toast.success("Videos uploaded successfully! Backend might be experiencing temporary issues.");

        setTimeout(() => {
          navigate("/dashboard/visualization");
        }, 5000);
      } else {
        // For other types of errors
        toast.error("An unexpected error occurred during upload.");
      }
    } finally {
      setUploading(false);
      setLoading(false);
      setBlurred(false);
    }
  };


  useEffect(() => {
    const drawTimeline = () => {
      if (canvasRef.current && videos.length > 0) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = 1180;
        canvas.height = canvas.clientHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0);

        const gapWidth = (videos.length - 1) * 2;
        const availableWidth = 1950 - gapWidth;

        let currentX = 0;

        videos.forEach((video, index) => {
          const videoWidth = (video.duration / totalDuration) * availableWidth;

          const y = 30;
          const height = canvas.height - 30;

          context.fillStyle = index === currentVideoIndex ? "#ccc" : "#ccf";
          context.fillRect(currentX, y, videoWidth, height);

          if (index === selectedVideoIndex) {
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.strokeRect(currentX, y, videoWidth, height);
          }

          context.fillStyle = "black";
          const interval = video.duration / 4;
          for (let i = 0; i <= 4; i++) {
            const indicatorX = currentX + (i * videoWidth / 4);
            context.fillRect(indicatorX, 25, 1, 5);
            if (i % 2 === 0) {
              context.fillText(`${Math.floor(i * interval)}s`, indicatorX, 20);
            }
          }

          currentX += videoWidth + (index < videos.length - 1 ? 2 : 0);
        });
      }
    };

    if (videos.length > 0) {
      const video = document.createElement('video');
      video.src = videos[videos.length - 1].src;
      video.onloadedmetadata = () => {
        setVideos(prevVideos => {
          const newVideos = [...prevVideos];
          newVideos[newVideos.length - 1].duration = video.duration;
          return newVideos;
        });
        drawTimeline();
        setIsVideoProcessing(false);
      };

      video.onerror = () => {
        toast.error('Error processing video');
        setIsVideoProcessing(false);
      };
    }
  }, [videos, currentVideoIndex, selectedVideoIndex]);

  const handleTimelineClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;

    let accumulatedWidth = 0;
    const spacing = 1;

    for (let i = 0; i < videos.length; i++) {
      const totalDuration = videos.reduce((sum, video) => sum + video.duration, 0);
      const videoWidth = (videos[i].duration / totalDuration) * canvas.width;

      if (x >= accumulatedWidth && x < accumulatedWidth + videoWidth) {
        setCurrentVideoIndex(i); // Set the selected video as the current video
        break;
      }

      accumulatedWidth += videoWidth + spacing;
    }
  };


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      sx={{ padding: 3 }}
    >
      <ToastContainer />
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
          <Typography variant="h5" align="center" sx={{
            fontWeight: '600',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}>
            Upload Videos
          </Typography>
          <CustomButton
            title={videos.length > 0 ? "Done" : "Upload"}
            IconComponent={FileUploadOutlinedIcon}
            onClick={videos.length > 0 ? handleDoneClick : handleAdd}
          />
        </Box>

        <Box
          mt={3}
          component="video"
          ref={videoRef}
          width="100%"
          height="50%"
          bgcolor="#d3d3d3"
          controls
          src={videos[currentVideoIndex]?.src} // Sync with currentVideoIndex
        />


        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <IconButton onClick={handleRewind}><FastRewindIcon /></IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton onClick={handleFastForward}><FastForwardIcon /></IconButton>
          <IconButton onClick={handleFullscreen}><FullscreenIcon /></IconButton>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={2}
          borderTop="1px solid #ccc"
        >
          <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
            <IconButton onClick={handleUndo}><UndoIcon /></IconButton>
            <IconButton onClick={handleRedo}><RedoIcon /></IconButton>
            {/* <IconButton onClick={handleCut}><ContentCutIcon /></IconButton> */}
            <IconButton onClick={handleAdd}><AddIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
          </Box>
        </Box>

        <Box
          ref={timelineRef}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mt={2}
          width="100%"
          height="100px"
          borderTop="1px solid #ccc"
          position="relative"
          overflow="auto"
          sx={{
            borderRadius: 1,
            backgroundColor: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onClick={handleTimelineClick}


        >
          <canvas ref={canvasRef} style={{ height: "100%" }} />
          {(!videos || videos.length === 0) && (
            <Box {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <input {...getInputProps()} />
              <Typography variant="h6" color="textSecondary">
                {isDragActive ? "Drop the video here ..." : "Drag and drop a video file here, or click to select one"}
              </Typography>
            </Box>
          )}

        </Box>
      </Box>

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
            Uploading video...
          </Typography>
        </Box>
      )}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="video/*"
        onChange={handleFileInputChange}
      />
    </Box>
  );
};

export default VideoEditor;
