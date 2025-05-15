<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Movie Explorer Application

This is a React TypeScript application for exploring movies using the TMDB API. It's built with:

- React with TypeScript
- Material-UI (MUI) for styling
- React Router for navigation
- Axios for API requests

### Key Components

- `src/components/ui/` - Contains reusable UI components like MovieCard, MovieList, and SearchBar
- `src/components/ui/home` - Contains reusable UI components like HeroSection and other sections specific to the home page
- `src/components/ui/movieDetails` - Contains reusable UI components like RecommendationSection and other sections specific to the Movie Details page
- `src/components/layout/` - Contains layout components like MainLayout
- `src/pages/` - Contains page components for different routes
- `src/context/MovieContext.tsx` - Context provider for movie data
- `src/api/movieApi.ts` - API service for fetching movie data
- `src/types/movie.types.ts` - TypeScript interfaces for movie data
- `src/utils/formatters.ts` - Utility functions for formatting data

### Development Tips

- This project uses environment variables for API keys. Create a `.env` file with `VITE_TMDB_API_KEY=your_key_here`
- Material-UI theme is configured in `src/styles/theme.ts`
- To add more pages, create a new component in `src/pages/` and add it to the routes in `App.tsx`
