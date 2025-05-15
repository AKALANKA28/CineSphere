import React from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { Genre } from "../../../types/movie.types";

interface MoviesFilterProps {
  genres: Genre[];
  sortBy: string;
  selectedGenre: string;
  selectedRating: string;
  selectedYear: string;
  selectedLanguage: string;
  onSortByChange: (event: SelectChangeEvent) => void;
  onGenreChange: (event: SelectChangeEvent) => void;
  onRatingChange: (event: SelectChangeEvent) => void;
  onYearChange: (event: SelectChangeEvent) => void;
  onLanguageChange: (event: SelectChangeEvent) => void;
  onSearch: (event: React.FormEvent) => void;
}

const MoviesFilter: React.FC<MoviesFilterProps> = ({
  genres,
  sortBy,
  selectedGenre,
  selectedRating,
  selectedYear,
  selectedLanguage,
  onSortByChange,
  onGenreChange,
  onRatingChange,
  onYearChange,
  onLanguageChange,
  onSearch,
}) => {
  return (
    <Paper
      component="form"
      elevation={3}
      onSubmit={onSearch}
      sx={{
        mb: 6,
        p: 3,
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "primary.main"
            : "rgba(18, 18, 18, 0.95)",
        color: "white",
        borderRadius: 1,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Genre:
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedGenre}
                onChange={onGenreChange}
                displayEmpty
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(24, 24, 24, 0.98)",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Rating:
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedRating}
                onChange={onRatingChange}
                displayEmpty
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(24, 24, 24, 0.98)",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="9">9+</MenuItem>
                <MenuItem value="8">8+</MenuItem>
                <MenuItem value="7">7+</MenuItem>
                <MenuItem value="6">6+</MenuItem>
                <MenuItem value="5">5+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Year:
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedYear}
                onChange={onYearChange}
                displayEmpty
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(24, 24, 24, 0.98)",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {Array.from(
                  { length: 30 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Language:
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedLanguage}
                onChange={onLanguageChange}
                displayEmpty
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(24, 24, 24, 0.98)",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ja">Japanese</MenuItem>
                <MenuItem value="ko">Korean</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
              Order By:
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={sortBy}
                onChange={onSortByChange}
                displayEmpty
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "rgba(24, 24, 24, 0.98)",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="popularity.desc">Most Popular</MenuItem>
                <MenuItem value="popularity.asc">Least Popular</MenuItem>
                <MenuItem value="vote_average.desc">Highest Rated</MenuItem>
                <MenuItem value="vote_average.asc">Lowest Rated</MenuItem>
                <MenuItem value="release_date.desc">Latest</MenuItem>
                <MenuItem value="release_date.asc">Oldest First</MenuItem>
                <MenuItem value="original_title.asc">Title (A-Z)</MenuItem>
                <MenuItem value="original_title.desc">Title (Z-A)</MenuItem>
                <MenuItem value="revenue.desc">Highest Revenue</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={0.5}
            sx={{ display: "flex", alignItems: "flex-end" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                height: "40px",
                bgcolor: "#0d47a1",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
                textTransform: "none",
              }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MoviesFilter;
