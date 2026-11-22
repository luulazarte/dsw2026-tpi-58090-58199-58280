import { useEffect, useState } from 'react';

const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_MS = 400;

export default function usePaginatedSearch({ fetchPage, pageSize }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const name = searchTerm.trim();

    if (name.length > 0 && name.length < MIN_SEARCH_LENGTH) {
      return;
    }

    const loadPage = async () => {
      setIsLoading(true);
      setError('');
      const { data, error: requestError } = await fetchPage({
        pageSize,
        pageIndex: page,
        name,
      });

      if (requestError) {
        setError(requestError);
      } else {
        setItems(data.data);
        setTotal(data.total);
      }

      setIsLoading(false);
    };

    const timer = setTimeout(loadPage, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [fetchPage, pageSize, page, searchTerm, reloadKey]);

  const changeSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const refreshAfterDelete = () => {
    if (items.length === 1 && page > 1) {
      setPage(page - 1);
    } else {
      setReloadKey((key) => key + 1);
    }
  };

  return {
    items,
    total,
    page,
    setPage,
    searchTerm,
    changeSearch,
    isLoading,
    error,
    refreshAfterDelete,
  };
}
