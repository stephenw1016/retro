import cache from './cache';
import { firebase } from '../context/FirebaseContext';

const CATEGORIES_CACHE_KEY = 'retro-categories';

/**
 * Make api request save a Session.
 * @param {Session} session - the session to save
 * @returns {Promise<Category[]>}
 */
export const saveSession = async (session) => {
  try {
    // await firebase.db.collection('sessions')
    //   .doc(session.id)
    //   .set(session);
    return session;
  } catch (err) {
    console.error('An error occurred while saving a session', session, err);
    return null;
  }
};

/**
 * Make api request to retrieve categories.
 * @returns {Promise<Category[]>}
 */
const requestCategories = async () => {
  const { docs } = await firebase.db.collection('categories').get();
  const categories = docs.reduce((all, doc) => ({ ...all, [doc.id]: doc.data() }), Object.create(null));

  cache.set(CATEGORIES_CACHE_KEY, categories);

  return categories;
};

/**
 * Get categories from cache or server.
 * @returns {Promise<Category[]>}
 */
export const getCategories = async () => cache.get(CATEGORIES_CACHE_KEY) || requestCategories();
