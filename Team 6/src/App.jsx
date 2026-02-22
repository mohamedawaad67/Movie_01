import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (el) => el.id === item.id && el.type === item.type
      );
      const updated = exists
        ? prev.filter((el) => !(el.id === item.id && el.type === item.type))
        : [...prev, item];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="light-mode">
      <Navbar wishlist={wishlist} />
      <div className="main-content">
        <Outlet context={{ wishlist, toggleWishlist }} />
      </div>
    </div>
  );
}

export default App;