import { useOutletContext, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Wishlist() {
  const { wishlist, toggleWishlist } = useOutletContext();

  return (
    <div className="container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <p style={{ fontSize: "30px", opacity: 0.7 }}>♥ Your wishlist is empty.</p>
          <Link to="/" style={{ marginTop: "20px", display: "inline-block" }}>
            <button className="gotohome">Go to Home Page</button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          {wishlist.map((item) => (
            <MovieCard
              key={item.id}
              movie={item}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;