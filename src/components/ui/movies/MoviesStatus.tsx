import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";

interface MoviesStatusProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

const MoviesStatus: React.FC<MoviesStatusProps> = ({
  isLoading,
  error,
  isEmpty,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading movies...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          mb: 4,
          backgroundColor: "rgba(211, 47, 47, 0.1)",
          "& .MuiAlert-icon": { color: "error.main" },
        }}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Alert
        severity="info"
        sx={{
          mb: 4,
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          "& .MuiAlert-icon": { color: "info.main" },
        }}
      >
        <AlertTitle>No Movies Found</AlertTitle>
        Try adjusting your search filters to find more movies.
      </Alert>
    );
  }

  return null;
};

export default MoviesStatus;
