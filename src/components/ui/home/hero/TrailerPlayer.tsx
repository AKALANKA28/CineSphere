import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TrailerPlayerProps {
  trailerKey: string;
  onClose?: () => void;
}

const TrailerPlayer: React.FC<TrailerPlayerProps> = ({
  trailerKey,
  onClose,
}) => {
  // Function to handle background clicks but prevent closing when clicking on the player
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <Box
      onClick={handleBackgroundClick} // Add click handler to background
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer", // Shows pointer cursor on the overlay
      }}
    >
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            zIndex: 1001,
            padding: "12px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          <CloseIcon fontSize="medium" />
        </IconButton>
      )}{" "}
      <Box
        // Stop propagation to prevent closing when clicking on the player container
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          height: { xs: "40%", sm: "50%", md: "60%" },
          maxWidth: "1000px",
          maxHeight: "600px",
          position: "relative",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "default", // Reset cursor to default for player area
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default TrailerPlayer;
