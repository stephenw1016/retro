export const getCategories = state => Object.values(state.categories);

export const getSessionById = (state, id) => state.sessions[id];
