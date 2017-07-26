import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import {guid} from '@/assets/js/util';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    course: {
      id: guid(),
      title: '课件生成器',
      pages: [{
        id: guid(),
        blocks: []
      }]
    },
    currentPageIndex: 0
  },
  mutations,
  actions
});

export default store;
