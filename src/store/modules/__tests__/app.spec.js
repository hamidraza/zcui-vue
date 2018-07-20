import {mutations} from '../app';

describe('AppModule', () => {
  describe('mutation', () => {
    it('increment', () => {
      const state = { count: 0 };
      mutations.increment(state);
      expect(state.count).toBe(1);
    });
  });
});

/** Write your test cases here **/
