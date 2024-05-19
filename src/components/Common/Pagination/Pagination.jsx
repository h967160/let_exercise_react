import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPage, onChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.pageLink} ${
            currentPage === i ? styles.active : ""
          }`}
          onClick={() => onChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.paginationBox}>
      <div className={styles.pagination}>
        <button
          className={styles.pageLink}
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          className={styles.pageLink}
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
