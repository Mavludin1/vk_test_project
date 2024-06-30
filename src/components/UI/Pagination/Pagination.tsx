import { observer } from "mobx-react-lite";
import classNames from "classnames";
import styles from "./Pagination.module.css";
import { PaginationButton } from "../PaginationButton/PaginationButton";
import { useEffect } from "react";

type PaginationProps = {
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const getVisiblePages = (currentPage: number, totalPageCount: number) => {
  const visiblePages = 10;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;

  if (endPage > totalPageCount) {
    endPage = totalPageCount;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  return { startPage, endPage };
};

export const Pagination = observer(
  ({
    currentPage,
    totalPageCount,
    onPageChange,
    onNextPage,
    onPrevPage,
  }: PaginationProps) => {
    const { startPage, endPage } = getVisiblePages(currentPage, totalPageCount);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handlePageClick = (page: number) => {
      onPageChange(page);
    };

    const handleNextClick = () => {
      onNextPage();
    };

    const handlePrevClick = () => {
      onPrevPage();
    };

    const renderPageNumbers = () => {
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={classNames(styles.page_number, {
              [styles.active]: i === currentPage,
            })}
            disabled={i === currentPage}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
      return pages;
    };

    return (
      <div className={styles.pagination}>
        <PaginationButton
          type="prev"
          disabled={currentPage === 1}
          onClick={handlePrevClick}
        />
        {renderPageNumbers()}
        <PaginationButton
          type="next"
          disabled={currentPage === totalPageCount}
          onClick={handleNextClick}
        />
      </div>
    );
  }
);
