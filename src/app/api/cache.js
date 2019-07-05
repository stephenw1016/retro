/**
 * Get value from cache.
 * @param {string} key
 * @returns {null|any}
 */
const get = (key) => {
  const cachedValue = localStorage.getItem(key);

  if (!cachedValue) {
    return null;
  }

  try {
    return JSON.parse(cachedValue);
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * Store value in cache.
 * @param {string} key
 * @param {any} value
 */
const set = (key, value) => {
  if (key && value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default {
  get,
  set,
};
