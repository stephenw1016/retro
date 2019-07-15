const base = '/';

const routes = {
  HOME: `${base}home`,
  SESSION_SUMMARY: `${base}session-summary`,
  SESSION_SUMMARY_BY_ID: `${base}session-summary/:id`,
  NEW_SESSION: `${base}new-session`,
  PRIVACY_POLICY: `${base}privacy-policy`,
  SESSION: `${base}sessions`,
  SESSION_BY_ID: `${base}sessions/:id`,
  SIGN_IN: `${base}sign-in`,
  TERMS_OF_SERVICE: `${base}tos`,
  USER_PROFILE: `${base}profile`,
};

export default routes;
