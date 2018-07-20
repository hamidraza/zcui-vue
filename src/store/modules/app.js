/* @flow */
type AppState = {
  count: number,
};

type actionArg = {
  commit: (string) => void,
};

export const state: AppState = {
  count: 0,
};

export const mutations = {
  increment (state: AppState) {
    state.count++;
  },
  decrement (state: AppState) {
    state.count--;
  },
};

export const actions = {
  increment: (act: actionArg) => act.commit('increment'),
  decrement: (act: actionArg) => act.commit('decrement'),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
