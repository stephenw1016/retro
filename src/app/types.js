// @flow

/**
 * A category used for voting and evaluating team health.
 */
export type Category = {
  id: string,
  title: string,
  description: {
    positive: string,
    negative: string,
  },
};

/**
 * A team health check session.
 */
export type Session = {
  id: string,
  date: string,
  name: string,
  organization: string,
  categoryIndex: number,
  categories: Array<Category>,
  createDate: string,
  createdBy: string,
  isComplete: boolean,
};
