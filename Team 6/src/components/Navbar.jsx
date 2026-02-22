import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ wishlist }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search/${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <nav>
      <div className="logo">MovieApp</div>

      <div className="links">
        <Link to="/">Movies</Link>
        <Link to="/wishlist">♥Wishlist ({wishlist.length})</Link>
      </div>

      <form onSubmit={handleSubmit} className="nav-search">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
}

export default Navbar;