import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { API_KEY } from "../constants";

function SearchResults() {
  const { query } = useParams();
   
  const { wishlist, toggleWishlist } = useOutletContext();

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => setPage(1), [query]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return }
    setLoading(true);
          fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          decodeURIComponent(query)
        )}&page=${page}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch search results");
          return res.json();
        })
        .then((data) => {
          setResults(data.results || []);
          setTotalPages(data.total_pages || 1);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
        }, [query, page]);

  return (
    <div className="container">
      <h2>
        Search results for: <span style={{ opacity: 0.8 }}>{decodeURIComponent(query)}</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          <div className="grid">
            {results.map((item) => (
              <MovieCard
                key={item.id}
                movie={{ ...item, type: "movie", title: item.title }}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage(p => Math.max(p - 1, 1))}
            onNext={() => setPage(p => Math.min(p + 1, totalPages))}
          />
        </>
      )}
    </div>
  );
}

export default SearchResults;