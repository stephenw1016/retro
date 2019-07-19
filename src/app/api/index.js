import cache from './cache';
import { firebase } from '../context/FirebaseContext';

const CATEGORIES_CACHE_KEY = 'retro-categories';

/**
 * Make api request to retrieve a session.
 * @returns {Promise<Session>}
 */
const requestSessionById = async (id) => {
  let session;

  try {
    const doc = await firebase.db.collection('sessions').doc(id).get();
    if (doc.exists) {
      session = doc.data();
    }
  } catch (err) {
    console.error('An error occurred while requesting a session by id', err);
  }

  return session;
};

/**
 * Get session a session from cache or server.
 * @param {string} id
 * @returns {Promise<Session>}
 */
export const getSessionById = async id => requestSessionById(id);

/**
 * Make api request save a Session.
 * @param {Session} session - the session to save
 * @returns {Promise<Session>}
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
  let categories;

  try {
    const { docs } = await firebase.db.collection('categories').get();
    categories = docs.reduce((all, doc) => ({ ...all, [doc.id]: doc.data() }), Object.create(null));
    cache.set(CATEGORIES_CACHE_KEY, categories);
  } catch (err) {
    console.error('An error occurred while requesting categories', err);
    categories = [];
  }

  return categories;
};

/**
 * Get categories from cache or server.
 * @returns {Promise<Category[]>}
 */
export const getCategories = async () => cache.get(CATEGORIES_CACHE_KEY) || requestCategories();
