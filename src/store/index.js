import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import {guid, updateJSON, clone} from '@/assets/js/util';
import data from '@/assets/js/data';

Vue.use(Vuex);

let course;
let storage = window.localStorage;
if (storage && storage.getItem('course')) {
  course = JSON.parse(storage.getItem('course'));
} else {
  course = clone(data.course);
  updateJSON(course, 'id', guid);
}

const store = new Vuex.Store({
  state: {
    course,
    currentPageIndex: 0,
    currentUnitIndex: 0
  },
  mutations,
  actions
});

export default store;
