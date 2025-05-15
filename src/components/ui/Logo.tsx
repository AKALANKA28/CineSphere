import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  onClick?: () => void;
  variant?: "default" | "compact";
}

const Logo: React.FC<LogoProps> = ({ onClick, variant = "default" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: variant === "compact" ? 30 : 36,
          height: variant === "compact" ? 30 : 36,
          borderRadius: "50%",
          bgcolor: "#3b82f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          mr: 1,
          color: "#ffffff",
        }}
      >
        M
      </Box>
      {variant === "default" && (
        <>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
            }}
          >
            ovie Explorer
          </Typography>
         
        </>
      )}
    </Box>
  );
};

export default Logo;
