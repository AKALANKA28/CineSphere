import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ErrorMessageProps {
  message: string;
  onGoBack: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onGoBack }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h5" color="error" align="center">
        {message}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={onGoBack}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorMessage;
