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
