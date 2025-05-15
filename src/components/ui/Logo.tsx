import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

interface LogoProps {
  onClick?: () => void;
  variant?: "default" | "compact";
}

const Logo: React.FC<LogoProps> = ({ onClick, variant = "default" }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
          position: "relative",
          width: variant === "compact" ? 35 : 42,
          height: variant === "compact" ? 35 : 42,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 4px 10px ${
            theme.palette.mode === "light"
              ? "rgba(178, 7, 15, 0.3)"
              : "rgba(229, 42, 51, 0.3)"
          }`,
          mr: 1.5,
          transform: "rotate(-5deg)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(0deg)",
          },
        }}
      >
        <LocalMoviesIcon
          sx={{
            fontSize: variant === "compact" ? 18 : 24,
            color: "#ffffff",
            position: "absolute",
            zIndex: 2,
          }}
        />
        <MovieFilterIcon
          sx={{
            fontSize: variant === "compact" ? 22 : 28,
            color: "rgba(255, 255, 255, 0.4)",
            position: "absolute",
            transform: "rotate(45deg)",
            zIndex: 1,
          }}
        />
      </Box>{" "}
      {variant === "default" && (
        <>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.5px",
            }}
          >
            CineSphere
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Logo;
