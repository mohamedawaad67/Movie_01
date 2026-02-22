function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page === 1}>⬅ Prev</button>
      <span>Page {page} / {totalPages ?? "..."}</span>
      <button onClick={onNext} disabled={totalPages ? page >= totalPages : false}>
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;