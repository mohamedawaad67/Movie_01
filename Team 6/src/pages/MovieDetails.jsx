import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import WishlistButton from "../components/WishlistButton";
import RecommendationsGrid from "../components/RecommendationsGrid";
import { API_KEY } from "../constants";

function MovieDetails() {
  const { id } = useParams();
  const { wishlist, toggleWishlist } = useOutletContext();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!detailsRes.ok) throw new Error("Failed to fetch details");
        const detailsData = await detailsRes.json();

        const recRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        if (!recRes.ok) throw new Error("Failed to fetch recommendations");
        const recData = await recRes.json();

        setMovie({ ...detailsData, type: "movie" });
        setRecommendations(recData.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          style={{ maxWidth: "300px", borderRadius: "10px" }}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.overview || "No description available."}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
          <WishlistButton item={movie} wishlist={wishlist} toggleWishlist={toggleWishlist} />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Recommended</h3>
       <RecommendationsGrid
          items={recommendations.map(r => ({ ...r, type: "movie", title: r.title }))}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      </div>
    </div>
  );
}

export default MovieDetails;