import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  if (startPage > 0) {
    pages.push(
      <button
        key="first"
        className="btn-pagination"
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      >
        First
      </button>
    );
  }

  if (startPage > 0) {
    pages.push(
      <span key="dots-start" className="pagination-dots">
        ...
      </span>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`btn-pagination ${currentPage === i ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
      >
        {i + 1}
      </button>
    );
  }

  if (endPage < totalPages - 1) {
    pages.push(
      <span key="dots-end" className="pagination-dots">
        ...
      </span>
    );
  }

  if (endPage < totalPages - 1) {
    pages.push(
      <button
        key="last"
        className="btn-pagination"
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      >
        Last
      </button>
    );
  }

  return (
    <div className="pagination-container">
      <button
        className="btn-pagination"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {pages}

      <button
        className="btn-pagination"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>

      <span className="page-info">
        Page {currentPage + 1} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
