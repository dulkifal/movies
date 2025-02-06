import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  useDebounce(() => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,[searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.response === "False") {
        setErrorMessage(
          data.Error || "Error fetching movies. Please try again later."
        );
        setMovieList([]);
        return;
      }
      console.log(data);

      setMovieList(data.results);

      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const loadTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setTrendingMovies(trendingMovies);
    } catch (error) {
      console.error(`error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
    console.log("Trending Movies", trendingMovies);
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper" >
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1 className="text-white">
          Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
          Without the Hassle
        </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
          {trendingMovies.map((movie, index) => (
            <li key={movie.$id}>
              <p>{index + 1}</p>

              <img src={movie.poster_url} alt="" />
            </li>
          ))}
        </ul>
        </section>
      )}

      <section className="all-movies">
        <h2>Popular Movies</h2>
        {isLoading && <Spinner />}
        {errorMessage && <p>{errorMessage}</p>}
       
        <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.movie_id} movie={movie} />
            ))}
          </ul>
      </section>
      </div>
    </main>
  );
}

export default App;
