import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/ui/home/hero/HeroSection";
import HomeContent from "../components/ui/home/HomeContent";

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <HomeContent />
    </Box>
  );
};

export default HomePage;
