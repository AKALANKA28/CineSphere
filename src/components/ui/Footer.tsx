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
          mode === "dark"
            ? theme.palette.background.paper
            : theme.palette.grey[900],
        color: theme.palette.common.white,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Movie Explorer. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
