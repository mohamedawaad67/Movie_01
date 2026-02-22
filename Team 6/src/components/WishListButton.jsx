function WishlistButton({ item, wishlist, toggleWishlist }) {
  const inWishlist = wishlist.some(
    (el) => el.id === item.id && el.type === item.type
  );

  return (
    <button
      onClick={() =>
        toggleWishlist({
          id: item.id,
          type: item.type,
          title: item.title,
          poster_path: item.poster_path
        })
      }
      className={inWishlist ? "red" : "white"}
    >
      ♥
    </button>
  );
}

export default WishlistButton;