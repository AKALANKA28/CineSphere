import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: "6rem", fontWeight: "bold", color: "primary.main" }}
        >
          404
        </Typography>

        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>

          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
