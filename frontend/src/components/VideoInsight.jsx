import React, { useState, useRef, useEffect } from "react";
import { Button, Box, IconButton, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
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

const VideoInsight = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false); // Reset playing state when a new video is uploaded
    }
  };

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

  useEffect(() => {
    const drawFrames = () => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const frameCount = Math.floor(videoRef.current.duration);
        const interval = videoRef.current.duration / frameCount;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        for (let i = 0; i < frameCount; i++) {
          setTimeout(() => {
            videoRef.current.currentTime = i * interval;
            videoRef.current.onseeked = () => {
              context.drawImage(
                videoRef.current,
                (i * canvas.width) / frameCount,
                0,
                canvas.width / frameCount,
                canvas.height
              );
            };
          }, i * 200); // Adjust timeout as needed
        }
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
      justifyContent="center"
      height="100%"
      sx={{ backgroundColor: "#f5f5f5", padding: 3 }}
    >
      <Box display="flex" justifyContent="flex-end" width="100%" mb={2}>
        <input
          accept="video/*"
          style={{ display: "none" }}
          id="video-upload"
          type="file"
          onChange={handleVideoUpload}
        />
        <label htmlFor="video-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadFileIcon />}
          >
            Upload Video
          </Button>
        </label>
      </Box>
      <Box
        component="video"
        ref={videoRef}
        width="80%"
        height="auto"
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
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        mt={2}
      >
        <Box display="flex" justifyContent="flex-start" alignItems="center">
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
        <Box>
          <Typography variant="body1">
            {Math.floor(videoCurrentTime)} / {Math.floor(videoDuration)} seconds
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        width="100%"
        height="100px"
        border="1px solid #ccc"
        position="relative"
      >
        {videoSrc ? (
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100px" }}
          />
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
            Drag and Drop media here to analyze videos
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default VideoInsight;
