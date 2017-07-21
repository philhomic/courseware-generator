import data from '@/assets/js/data';
import {guid, clone, updateJSON} from '@/assets/js/util';

export default {
  addBlock (state, payload) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let d = clone(data[payload.type]);
    updateJSON(d, 'id', guid);
    currentPage.blocks.push(d);
    if (d.isQuestion) {
      currentPage.questionCount ++;
    }
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
