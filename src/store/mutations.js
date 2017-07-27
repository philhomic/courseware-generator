import data from '@/assets/js/data';
import {guid, clone, updateJSON, refreshQuestionNumber, storeToLocal} from '@/assets/js/util';
import Vue from 'vue';

export default {
  addPage (state) {
    let d = clone(data.page);
    let pages = state.course.pages;
    updateJSON(d, 'id', guid);
    pages.push(d);
    Vue.set(state, 'currentPageIndex', pages.length - 1);
    storeToLocal('course', state.course);
  },
  deletePage (state, payload) {
    let pages = state.course.pages;
    let pageIndex = payload.pageIndex;
    state.course.pages.splice(pageIndex, 1);
    if (pages.length === 0) {
      let d = clone(data.page);
      updateJSON(d, 'id', guid);
      pages.push(d);
    }
    Vue.set(state, 'currentPageIndex', 0);
    storeToLocal('course', state.course);
  },
  addBlock (state, payload) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let d = clone(data[payload.type]);
    updateJSON(d, 'id', guid);
    currentPage.blocks.push(d);
    refreshQuestionNumber(currentPage);
    storeToLocal('course', state.course);
  },
  copyBlock (state, payload) {
    let page = state.course.pages[payload.pageIndex];
    let blocks = page.blocks;
    blocks.splice(payload.blockIndex, 0, clone(payload.data));
    let json = blocks[payload.blockIndex + 1];
    updateJSON(json, 'id', guid);
    refreshQuestionNumber(page);
    storeToLocal('course', state.course);
  },
  deleteBlock (state, payload) {
    let page = state.course.pages[payload.pageIndex];
    let blocks = page.blocks;
    blocks.splice(payload.blockIndex, 1);
    refreshQuestionNumber(page);
    storeToLocal('course', state.course);
  },
  updateCheckbox (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, clone(payload.newData));
    storeToLocal('course', state.course);
  },
  addAnswer (state, payload) {
    let options = state.course.pages[payload.pageIndex].blocks[payload.blockIndex].assess.options;
    switch (payload.type) {
      case 'single':
        let keys = Object.keys(options);
        if (keys.indexOf(payload.optionId) < 0) {
          options[payload.optionId] = {flag: true};
        } else {
          options[payload.optionId].flag = false;
        }
        keys.forEach((key) => {
          if (key !== payload.optionId) {
            options[key].flag = false;
          }
        });
        break;
      case 'multiple':
        if (!options[payload.optionId] || (options[payload.optionId].flag && options[payload.optionId].flag === false)) {
          options[payload.optionId] = { flag: true };
        } else {
          options[payload.optionId].flag = false;
        }
        break;
    }
  },
  changeColumnCount (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].columnCount = payload.columnCount;
  },
  toggleOptionIndex (state, payload) {
    // console.log(payload.showOptionIndex);
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].showOptionIndex = payload.showOptionIndex;
  },
  addOption (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].options.push({
      id: guid(),
      text: '选项' + (payload.optionIndex + 1)
    });
  },
  deleteOption (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].options.splice(payload.optionIndex, 1);
  },
  cancelUpdateBlock (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, clone(payload.oldData));
  }
};
