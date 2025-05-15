import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";

const Footer: React.FC = () => {
  const theme = useMuiTheme();
  const mode = theme.palette.mode;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor:
          mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} CineSphere. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
