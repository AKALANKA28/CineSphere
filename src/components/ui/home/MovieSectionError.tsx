import React from "react";
import { Box, Alert, AlertTitle, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface MovieSectionErrorProps {
  error: string;
  onRetry?: () => void;
}

const MovieSectionError: React.FC<MovieSectionErrorProps> = ({
  error,
  onRetry,
}) => {
  return (
    <Box>
      <Alert
        severity="error"
        sx={{
          mb: 2,
          backgroundColor: "rgba(211, 47, 47, 0.1)",
          "& .MuiAlert-icon": { color: "error.main" },
        }}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default MovieSectionError;
