import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export class AppStoreState {
  constructor() {
    this.count = 0;
  }
  increment() {
    ++this.count;
  }
  decrement() {
    --this.count;
  }
}

export default new Vuex.Store({
  state: new AppStoreState,
  modules: {
  }
});

