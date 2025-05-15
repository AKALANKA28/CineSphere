import React from "react";
import { Box, Typography, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface MoviesCarouselProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: {
    xs: string | number;
    sm: string | number;
    md: string | number;
    lg: string | number;
  };
  showControls?: boolean;
  contentHeight?: string | number;
}

function MoviesCarousel<T>({
  title,
  items,
  renderItem,
  itemWidth = { xs: "160px", sm: "180px", md: "200px", lg: "220px" },
  showControls = true,
  contentHeight = "400px",
}: MoviesCarouselProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleSlide = (direction: "prev" | "next") => {
    if (containerRef.current) {
      const cardWidth =
        containerRef.current.querySelector(".carousel-item")?.clientWidth ||
        220;
      const gap = 24; // Gap between cards (3 * 8px from MUI spacing)
      const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 items at a time

      if (direction === "prev") {
        containerRef.current.scrollLeft -= scrollAmount;
      } else {
        containerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "text.primary" }}
        >
          {title}
        </Typography>
        {showControls && items.length > 3 && (
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => handleSlide("prev")}
              sx={(theme) => ({
                minWidth: 40,
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.1)"
                    : "rgba(255, 255, 255, 0.1)",
                color: theme.palette.mode === "light" ? "#333" : "#fff",
                mr: 1,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.2)",
                },
              })}
            >
              <NavigateBeforeIcon />
            </Button>
            <Button
              onClick={() => handleSlide("next")}
              sx={(theme) => ({
                minWidth: 40,
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0,0,0,0.1)"
                    : "rgba(255,255,255,0.1)",
                color: theme.palette.mode === "light" ? "#333" : "#fff",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.2)",
                },
              })}
            >
              <NavigateNextIcon />
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ position: "relative", minHeight: contentHeight }}>
        {items.length > 0 ? (
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              pb: 2,
              scrollBehavior: "smooth",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                className="carousel-item"
                sx={{
                  width: itemWidth,
                  flexShrink: 0,
                }}
              >
                {renderItem(item, index)}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={(theme) => ({
              color:
                theme.palette.mode === "light"
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(255,255,255,0.7)",
            })}
          >
            No items available.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default MoviesCarousel;
