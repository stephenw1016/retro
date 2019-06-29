import { useEffect, useState } from 'react';
import axios from 'axios';

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
        const { data } = await axios(url);
        if (mounted) {
          setCategories(data);
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
