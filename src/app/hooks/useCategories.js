import { useEffect, useState } from 'react';
import axios from 'axios';

import { endpoints } from '../constants';
// import { FirebaseContext } from '../context/firebase-context';

/**
 * @param {string} url
 * @returns {[object[], boolean]}
 */
export const useCategories = (url = endpoints.CATEGORIES) => {
  // const firebase = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        // const { docs } = await firebase.db.collection('categories').get();
        // const allData = docs.reduce((all, doc) => ({ ...all, [doc.id]: doc.data() }), Object.create(null));
        const { data } = await axios(url);
        const categoryResults = Object.entries(data).map(([id, value]) => ({ id, ...value }));

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
