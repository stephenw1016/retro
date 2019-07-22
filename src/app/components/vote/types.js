// @flow
export type VoteValue = 'positive' | 'neutral' | 'negative';

export type Vote = {
  id: string,
  value: VoteValue,
  comment?: string,
};
