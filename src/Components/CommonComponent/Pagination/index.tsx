import React from 'react';
import styles from '@/styles/pagination.module.scss';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers: { page: number; isActive: boolean }[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push({
      page: i,
      isActive: i === currentPage,
    });
  }

  const handlePageChange = (p) => {
    const newPage = parseInt(p);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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

  return (
    <div className={styles.main_container}>
      <ul className={styles.un_list}>
        <button onClick={handlePrevPage}>
          <FaCaretLeft color={'#FF7A00'} />
        </button>
        {pageNumbers.map((p) => (
          <button
            key={p.page}
            onClick={() => handlePageChange(p.page)}
            className={`${p.isActive ? styles['Active'] : styles['InActive']}`}
          >
            {p.page}
          </button>
        ))}
        <button onClick={handleNextPage}>
          <FaCaretRight color={'#FF7A00'} />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
