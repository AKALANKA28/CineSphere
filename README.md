# Movie Explorer App

A modern React application for exploring movies built with Material-UI, TypeScript, React Router, and Axios.

![Movie Explorer]()

## Features

- **Modern UI Design**: Clean and responsive interface with Material-UI
- **Movie Browsing**: Browse popular and trending movies
- **Search Functionality**: Search for movies by keywords
- **Movie Details**: View comprehensive information about each movie
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: Static typing for JavaScript to improve development experience
- **Material-UI (MUI)**: React components that implement Google's Material Design
- **React Router**: For navigation and routing
- **Axios**: Promise-based HTTP client for API requests
- **TMDb API**: The Movie Database API for fetching movie data

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

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

3. Create a `.env` file in the root directory and add your TMDB API key:

   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/              # API services and configurations
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ui/           # UI components
├── context/          # React context for state management
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── styles/           # Global styles and theme configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## API Reference

This project uses the TMDB API. You need to register for an API key at [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
