import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import {guid} from '@/assets/js/util';

Vue.use(Vuex);

let course;
let storage = window.localStorage;
if (storage && storage.getItem('course')) {
  course = JSON.parse(storage.getItem('course'));
} else {
  course = {
    id: guid(),
    title: '课件生成器',
    pages: [{
      id: guid(),
      blocks: []
    }]
  };
}

const store = new Vuex.Store({
  state: {
    course,
    currentPageIndex: 0
  },
  mutations,
  actions
});

export default store;
