import { act } from 'react';
import { renderHook } from '@testing-library/react';

import useSearchPagination from './useSearchPagination';

interface Item {
  name: string;
  role: string;
}

const mockData: Item[] = [
  { name: 'Alice', role: 'Developer' },
  { name: 'Bob', role: 'Designer' },
  { name: 'Charlie', role: 'DevOps' },
  { name: 'Dana', role: 'Analyst' },
  { name: 'Eve', role: 'QA' },
];

describe('useSearchPagination hook', () => {
  it('returns filtered and paginated data correctly', () => {
    const { result } = renderHook(() =>
      useSearchPagination<Item>({
        data: mockData,
        searchKey: 'name',
        itemsPerPage: 2,
      })
    );

    expect(result.current.totalPages).toBe(3);
    expect(result.current.paginatedData.length).toBe(2);
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.setSearchQuery('a');
    });

    expect(result.current.searchQuery).toBe('a');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.filteredData.some((item) => item.name.includes('a'))).toBe(true);
  });

  it('paginates to next page correctly', () => {
    const { result } = renderHook(() =>
      useSearchPagination<Item>({
        data: mockData,
        searchKey: 'name',
        itemsPerPage: 2,
      })
    );

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData.length).toBe(2);
  });
});
