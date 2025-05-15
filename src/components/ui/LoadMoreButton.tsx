import React from "react";
import { Button, CircularProgress } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  text?: string;
  loadingText?: string;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onClick,
  isLoading = false,
  text = "Load More",
  loadingText = "Loading...",
  size = "large",
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      disabled={isLoading || disabled}
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={
        isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <MoreHorizIcon />
        )
      }
      sx={{
        px: 4,
        py: 1.2,
        bgcolor: (theme) => theme.palette.secondary.main,
        "&:hover": {
          bgcolor: (theme) => theme.palette.secondary.dark,
        },
      }}
    >
      {isLoading ? loadingText : text}
    </Button>
  );
};

export default LoadMoreButton;
