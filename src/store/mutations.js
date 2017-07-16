import data from '@/assets/js/data';
import {guid, clone, updateJSON} from '@/assets/js/util';

export default {
  addRadio (state) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let radioData = clone(data.radio);
    updateJSON(radioData, 'id', guid);
    currentPage.blocks.push(radioData);
    currentPage.questionCount ++;
  },
  addCheckbox (state) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let checkboxData = clone(data.checkbox);
    updateJSON(checkboxData, 'id', guid);
    currentPage.blocks.push(checkboxData);
    currentPage.questionCount ++;
  },
  addAnswer (state, payload) {
    let options = state.course.pages[payload.pageIndex].blocks[payload.blockIndex].assess.options;
    if (!options[payload.optionId] || (options[payload.optionId].flag && options[payload.optionId].flag === false)) {
      options[payload.optionId] = { flag: true };
    } else {
      options[payload.optionId].flag = false;
    }
  },
  changeColumnCount (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].columnCount = payload.columnCount;
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
  updateCheckbox (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, clone(payload.newData));
  },
  cancelUpdateBlock (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, clone(payload.oldData));
  },
  copyBlock (state, payload) {
    let blocks = state.course.pages[payload.pageIndex].blocks;
    blocks.splice(payload.blockIndex, 0, clone(payload.data));
    let json = blocks[payload.blockIndex + 1];
    updateJSON(json, 'id', guid);
  },
  deleteBlock (state, payload) {
    let blocks = state.course.pages[payload.pageIndex].blocks;
    blocks.splice(payload.blockIndex, 1);
  }
};
