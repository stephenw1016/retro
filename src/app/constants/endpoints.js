const base = '../../../../data/';

const dev = {
  CATEGORIES: `${base}categories.json`,
  SESSIONS: `${base}sessions.json`,
  TEAMS: `${base}teams.json`,
  USERS: `${base}users.json`,
};

const prod = {};

const endpoints = process.env.NODE_ENV === 'production' ? prod : dev;

export default endpoints;
