export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = totalPages > 0 && currentPage >= totalPages;

  const handlePreviousClick = () => {
    if (isFirstPage) return;
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (isLastPage) return;
    onPageChange(currentPage + 1);
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between"
    >
      <button
        type="button"
        onClick={handlePreviousClick}
        disabled={isFirstPage}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        className="rounded border border-slate-300 px-3 py-1 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <p className="text-sm text-slate-700">
        Page <span className="font-semibold">{currentPage}</span>{" "}
        <span className="text-slate-500">of</span>{" "}
        <span className="font-semibold">{totalPages || 1}</span>
      </p>

      <button
        type="button"
        onClick={handleNextClick}
        disabled={isLastPage}
        aria-label="Next page"
        aria-disabled={isLastPage}
        className="rounded border border-slate-300 px-3 py-1 text-sm font-medium text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
};


