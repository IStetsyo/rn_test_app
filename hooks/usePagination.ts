import React from "react";

type UsePaginationProps<T> = {
  data: T[];
  pageSize: number;
};

type PaginationState<T> = {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  setPage: (page: number) => void;
};

function usePagination<T>({
  data,
  pageSize,
}: UsePaginationProps<T>): PaginationState<T> {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const setPage = React.useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const paginatedData = React.useMemo(() => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, pageSize, data]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    setPage,
  };
}

export default usePagination;
