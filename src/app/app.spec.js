import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from './app.vue';

import {state as AppState} from '~/store/modules/app';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {
      propsData: {},
      mocks: {
        $store: {
          state: {
            App: AppState,
          },
        },
      },
      localVue,
    });
  });

  it('has h1', () => {
    expect(wrapper.find('h1').text()).toBe('ZcUI App!');
  });

  it('Initial count visible', () => {
    expect(wrapper.find('.count-value').text()).toBe('0');
  });

});
