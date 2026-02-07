'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
}

const Pagination = ({ totalPages, currentPage = 1 }: PaginationProps) => {
  const searchParams = useSearchParams();

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfWindow = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage - halfWindow < 1) {
      endPage = Math.min(totalPages, endPage + (halfWindow - currentPage + 1));
    }
    if (currentPage + halfWindow > totalPages) {
      startPage = Math.max(1, startPage - (currentPage + halfWindow - totalPages));
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={styles.paginationContainer}>
      <Link 
        href={buildPageHref(currentPage - 1)}
        className={`${styles.paginationButton} ${!hasPrevious ? styles.disabled : ''}`}
        onClick={(e) => !hasPrevious && e.preventDefault()}
      >
        Previous
      </Link>

      <div className={styles.pageNumbers}>
        {pages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className={styles.ellipsis}>...</span>
            ) : (
              <Link
                href={buildPageHref(page as number)}
                className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
              >
                {page}
              </Link>
            )}
          </div>
        ))}
      </div>

      <Link 
        href={buildPageHref(currentPage + 1)}
        className={`${styles.paginationButton} ${!hasNext ? styles.disabled : ''}`}
        onClick={(e) => !hasNext && e.preventDefault()}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;