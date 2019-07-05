import { useEffect, useState } from 'react';
import { getCategories } from '../api';

import { endpoints } from '../constants';

/**
 * @param {string} url
 * @returns {[object[], boolean]}
 */
export const useCategories = (url = endpoints.CATEGORIES) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const categoryResults = await getCategories();

        if (mounted) {
          setCategories(categoryResults);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    })();

    return () => { mounted = false; };
  }, [url]);

  return [categories, isError, isLoading];
};
