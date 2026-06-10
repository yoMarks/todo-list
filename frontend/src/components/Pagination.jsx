function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPreviousPage,
  onNextPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems <= itemsPerPage) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;