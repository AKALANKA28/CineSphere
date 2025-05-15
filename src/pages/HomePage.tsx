import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/ui/home/hero/HeroSection";
import HomeContent from "../components/ui/home/HomeContent";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <HeroSection />
      <Box sx={{ position: "relative", mt: -2, zIndex: 2 }}>
        <HomeContent />
      </Box>
    </Box>
  );
};

export default HomePage;
