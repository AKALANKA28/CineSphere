# Movie Explorer App

A modern React application for exploring movies built with Material-UI, TypeScript, React Router, and Axios. This application provides a beautiful interface for discovering movies, searching for favorites, and managing a personal watchlist.

[Movie Explorer](https://cine-sphere-two.vercel.app/)

## Features

- **Dynamic Hero Section**: Eye-catching hero section with trending movie trailers
- **Modern UI Design**: Clean and responsive interface built with Material-UI
- **Movie Discovery**: Browse popular, trending, top-rated, and upcoming movies
- **Advanced Search**: Search for movies by keywords with search history tracking
- **Movie Details**: View comprehensive information including:
  - Plot summaries and storylines
  - Cast and crew information
  - Video trailers and teasers
  - User ratings and popularity metrics
  - Related and recommended movies
- **User Authentication**: Secure login and registration system
- **Personal Watchlist**: Save favorite movies to a personal watchlist
- **Theme Switching**: Toggle between light and dark modes for comfortable viewing
- **Responsive Design**: Works seamlessly across all device sizes
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies Used

- **React 19**: Latest version with improved performance and features
- **TypeScript**: For type safety and enhanced developer experience
- **Material-UI (MUI)**: Comprehensive UI framework with responsive components
- **React Router v7**: Latest routing capabilities for single-page applications
- **Axios**: Feature-rich HTTP client for efficient API requests
- **Context API**: For global state management across the application
- **Custom Hooks**: Reusable logic for data fetching and UI interactions
- **The Movie Database API**: Rich source of movie data and media assets

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later recommended)
- npm or yarn
- TMDB API Account (free tier available)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB credentials:

   ```
   # Your API key from TMDB
   VITE_TMDB_API_KEY=your_api_key_here

   # Your access token from TMDB (if using Bearer token authentication)
   VITE_TMDB_ACCESS_TOKEN=your_access_token_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

6. For production builds:

   ```bash
   npm run build
   npm run preview   # To preview the production build locally
   ```

## Project Structure

```
src/
├── api/                   # API services and configurations
│   └── movieApi.ts        # TMDB API integration with Axios
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   │   └── MainLayout.tsx # Main application layout with header and footer
│   ├── routing/           # Routing related components
│   │   └── ProtectedRoute.tsx # Authentication protection for routes
│   ├── styles/            # Theme and styling configurations
│   └── ui/                # UI components
│       ├── auth/          # Authentication related components
│       ├── common/        # Common UI elements used across pages
│       ├── home/          # Components specific to home page
│       │   └── hero/      # Hero section with trending movies
│       ├── movieDetails/  # Components for movie details page
│       └── movies/        # Components for movie listings
├── context/               # React context for state management
│   ├── AuthContext.tsx    # Authentication state management
│   ├── MovieContext.tsx   # Movie data state management
│   ├── SearchHistoryContext.tsx # Search history tracking
│   ├── ThemeContext.tsx   # Theme preference management
│   └── WatchlistContext.tsx # User's watchlist management
├── hooks/                 # Custom React hooks
│   ├── useMovieDetails.ts # Hook for fetching movie details
│   └── useMuiTheme.ts     # Hook for theme management
├── pages/                 # Application pages/routes
│   ├── auth/              # Authentication pages
│   ├── HomePage.tsx       # Landing page with hero section
│   ├── MovieDetailsPage.tsx # Detailed movie information
│   ├── MoviesPage.tsx     # Movie discovery page
│   ├── SearchResultsPage.tsx # Search results display
│   └── WatchlistPage.tsx  # User's saved movies
├── types/                 # TypeScript type definitions
│   └── movie.types.ts     # Interfaces for movie data structures
└── utils/                 # Utility functions
    ├── debug.ts           # Debugging utilities
    └── formatters.ts      # Data formatting helpers
```

## API Integration

This project is powered by The Movie Database (TMDB) API. The integration provides access to:

1. **Movie Discovery**:

   - Popular movies
   - Trending movies (daily and weekly)
   - Top-rated movies
   - Upcoming releases
   - Now playing in theaters

2. **Search Capabilities**:

   - Search by movie title or keywords
   - Filter by year, genre, rating

3. **Movie Details**:
   - Full movie information
   - Cast and crew details
   - Movie trailers and videos
   - Similar and recommended movies
   - User ratings and reviews

### Setting Up API Access

1. Register for a free account at [TMDB](https://www.themoviedb.org/)
2. Go to your account settings and navigate to the API section
3. Request an API key for development use
4. Optionally, generate an API Read Access Token for V4 API access
5. Add these credentials to your `.env` file:

```
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_access_token_here
```

### API Implementation

The `movieApi.ts` file contains a configured Axios instance with:

- Base URL configuration
- Authentication headers
- Error handling interceptors
- Typed request and response handling

## Feature Details

### 1. Home Page

- Dynamic hero section showcasing trending movies with trailer playback
- Curated sections for popular, trending, and upcoming movies
- Quick navigation to movie categories

### 2. Movie Discovery

- Browse movies by multiple categories
- Filter by genres, year, and rating
- Infinite scrolling for seamless browsing
- Grid and list view options

### 3. Movie Details

- Comprehensive movie information page
- Tabbed interface for storyline, cast, and related content
- Interactive elements for ratings and watchlist management
- Trailer viewing integration

### 4. User Features

- Authentication system with login/registration
- Persistent watchlist across sessions
- Search history tracking for quick access to previous searches
- Theme preference saving

### 5. UI/UX Features

- Responsive design for all screen sizes
- Smooth animations and transitions
- Loading states with skeleton placeholders
- Error handling with user-friendly messages
- Dark/light theme toggle

## Development Guide

### Adding New Features

1. **Create Component**: Add new components in the appropriate directory under `src/components/`
2. **Add Routes**: Register new pages in `App.tsx` using React Router
3. **Update Context**: Extend context providers in `src/context/` for global state

### Styling Guidelines

- Use MUI's styling system with the `sx` prop for component-specific styling
- For reusable styles, extend the theme in `src/components/styles/theme.ts`
- Follow responsive design principles using MUI's breakpoints

### API Extensions

To add new API endpoints:

1. Add new function to `src/api/movieApi.ts`
2. Update TypeScript interfaces in `src/types/movie.types.ts` if needed
3. Create a custom hook in `src/hooks/` for component usage



## Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the comprehensive component library
- [React Router](https://reactrouter.com/) for routing capabilities
- [Axios](https://axios-http.com/) for HTTP requests
- [Vite](https://vitejs.dev/) for the fast development environment
