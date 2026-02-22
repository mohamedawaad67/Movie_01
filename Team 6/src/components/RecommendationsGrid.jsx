import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton"; // لو عاملته قبل كده

function RecommendationsGrid({ items, wishlist, toggleWishlist }) {
  if (!items || items.length === 0) return <p>No recommendations available.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
        gap: "15px",
        marginTop: "15px",
      }}
    >
      {items.map((rec) => (
        <div key={rec.id} style={{ textAlign: "center", position: "relative" }}>
          <Link to={`/movie/${rec.id}`}>
            <img
              src={
                rec.poster_path
                  ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={rec.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Link>

          <div style={{ position: "absolute", top: "5px", right: "5px" }}>
            <WishlistButton item={rec} wishlist={wishlist} toggleWishlist={toggleWishlist} />
          </div>

          <p style={{ fontSize: "0.9rem", marginTop: "5px", fontWeight: 500 }}>
            {rec.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecommendationsGrid;