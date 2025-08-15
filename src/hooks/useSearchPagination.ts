import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSearchPaginationProps<T> {
  data: T[];
  searchKey: keyof T;
  itemsPerPage?: number;
}

const useSearchPagination = <T extends Record<string, any>>({
  data,
  searchKey,
  itemsPerPage = 3,
}: UseSearchPaginationProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQueryState] = useState(() => searchParams.get('search') || '');
  const [currentPage, setCurrentPageState] = useState(() => Number(searchParams.get('page')) || 1);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) {
      params.search = searchQuery;
    }

    if (currentPage > 1) {
      params.page = String(currentPage);
    }

    setSearchParams(params);
  }, [searchQuery, currentPage, setSearchParams]);

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((item) => String(item[searchKey]).toLowerCase().includes(query));
  }, [data, searchQuery, searchKey]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSearch = (value: string) => {
    setSearchQueryState(value);
    setCurrentPageState(1);
  };

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page);
  };

  return {
    searchQuery,
    setSearchQuery: handleSearch,
    currentPage,
    setCurrentPage,
    totalPages: currentPage > totalPages ? currentPage : totalPages,
    paginatedData,
    filteredData,
  };
};

export default useSearchPagination;
