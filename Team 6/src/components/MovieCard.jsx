import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

function MovieCard({ movie, wishlist = [], toggleWishlist = () => {} }) {
  const title = movie.title || "Untitled";
  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={title}
        />
      </Link>
      <div className="info">
        <h3>{title}</h3>
        <WishlistButton
          item={{ ...movie, title, type: "movie" }}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      </div>
    </div>
  );
}

export default MovieCard;