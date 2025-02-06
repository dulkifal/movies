# My First React App

This project is a movie search application built with React and Vite. It allows users to search for movies and displays trending movies.

## Features

- Search for movies using the TMDB API
- Display a list of popular movies
- Display a list of trending movies
- Debounced search input to reduce API calls
- Loading spinner while fetching data
- Error handling for failed API requests

## Technologies Used

- React
- Vite
- TMDB API
- Appwrite

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-first-react-app.git
   ```
2. Install dependencies:
   ```bash
   cd my-first-react-app
   npm install
   ```
3. Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMBD_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Starts the development server with hot module replacement.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build locally.

## Learn More

To learn more about React and Vite, check out the following resources:

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
