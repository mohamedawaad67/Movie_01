import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { API_KEY } from "../constants";

function MoviesList() {
  const { wishlist, toggleWishlist } = useOutletContext();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages ?? null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container">
      <div className="header">
        <h2>Welcome to our movie app</h2>
        <p>Millions of movies to discover. Explore now.</p>
      </div>

      <h2>Now Playing:</h2>

      {loading ? <p>Loading...</p> : (
        <>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{ ...movie, type: "movie" }}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage(p => Math.max(p - 1, 1))}
            onNext={() => setPage(p => Math.min(p + 1, totalPages ?? Infinity))}
          />
        </>
      )}
    </div>
  );
}

export default MoviesList;