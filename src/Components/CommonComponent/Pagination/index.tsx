import React from 'react';
import styles from '@/styles/pagination.module.scss';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages: number = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    let startPage: number, endPage: number;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(maxVisiblePages / 2) + 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxVisiblePages / 2);
        endPage = currentPage + Math.floor(maxVisiblePages / 2);
      }
    }

    for (let i: number = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.main_container}>
      {totalPages > 1 && (
        <ul className={styles.un_list}>
          <button onClick={handlePrevPage}>
            <FaCaretLeft color={'#FF7A00'} />
          </button>
          {currentPage > Math.floor(maxVisiblePages / 2) + 1 && (
            <React.Fragment>
              <button onClick={() => handlePageChange(1)}>1</button>
              <span>...</span>
            </React.Fragment>
          )}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${page === currentPage ? styles.Active : styles.InActive}`}
            >
              {page}
            </button>
          ))}
          {currentPage + Math.floor(maxVisiblePages / 2) < totalPages && (
            <React.Fragment>
              <span>...</span>
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </React.Fragment>
          )}
          <button onClick={handleNextPage}>
            <FaCaretRight color={'#FF7A00'} />
          </button>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
