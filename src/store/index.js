import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import Hashids from 'hashids';

Vue.use(Vuex);

const questionnaireGuid = new Hashids('questionnaire', 8);
const pageGuid = new Hashids('page', 5);

const store = new Vuex.Store({
  state: {
    course: {
      id: questionnaireGuid.encode(0),
      title: '课件生成器',
      pages: [{
        id: pageGuid.encode(0),
        blocks: [],
        questionCount: 0
      }]
    },
    currentPageIndex: 0
  },
  mutations,
  actions
});

export default store;
