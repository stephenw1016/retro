import { useEffect, useState } from 'react';
import { getSessionById } from '../api';

/**
 * @param {string} id
 * @returns {[object, boolean, boolean]}
 */
export const useSession = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const sessionResult = await getSessionById(id);
        if (mounted) {
          setSession(sessionResult);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      }

      setIsLoading(false);
    })();

    return () => { mounted = false; };
  }, [id]);

  return [session, isError, isLoading];
};
