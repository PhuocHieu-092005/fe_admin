import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const pages = Array.from({ length: totalPages });

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex w-full max-w-80 items-center justify-between font-medium text-gray-500">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-sm">
          {pages.map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 w-10 items-center justify-center ${
                  currentPage === page
                    ? "rounded-full border border-indigo-200 text-indigo-500"
                    : ""
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg
            className="rotate-180"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
