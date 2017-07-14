import data from '@/assets/js/data';
import Hashids from 'hashids';

const blockGuid = new Hashids('block', 8);
const optionGuid = new Hashids('option', 10);
function same (data) {
  return JSON.parse(JSON.stringify(data));
}
// import {blockGuid, optionGuid} from '@/assets/js/util';

export default {
  addRadio (state) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let blockIndex = currentPage.blocks.length;
    let radioData = JSON.parse(JSON.stringify(data.radio));
    radioData.id = blockGuid.encode(state.currentPageIndex, blockIndex);
    radioData.options.forEach((option, optionIndex) => {
      option.id = optionGuid.encode(state.currentPageIndex, blockIndex, optionIndex);
    });
    currentPage.blocks.push(radioData);
    currentPage.questionCount ++;
  },
  addCheckbox (state) {
    let currentPage = state.course.pages[state.currentPageIndex];
    let blockIndex = currentPage.blocks.length;
    let checkboxData = JSON.parse(JSON.stringify(data.checkbox));
    checkboxData.id = blockGuid.encode(state.currentPageIndex, blockIndex);
    checkboxData.options.forEach((option, optionIndex) => {
      option.id = optionGuid.encode(state.currentPageIndex, blockIndex, optionIndex);
    });
    currentPage.blocks.push(checkboxData);
    currentPage.questionCount ++;
  },
  addAnswer (state, payload) {
    let options = state.course.pages[payload.pageIndex].blocks[payload.blockIndex].assess.options;
    if (!options[payload.optionId] || options[payload.optionId].flag === false) {
      options[payload.optionId] = { flag: true };
    } else {
      options[payload.optionId].flag = false;
    }
  },
  addOption (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].options.push({
      id: optionGuid.encode(payload.pageIndex, payload.blockIndex, payload.optionIndex),
      text: '选项' + (payload.optionIndex + 1)
    });
  },
  deleteOption (state, payload) {
    state.course.pages[payload.pageIndex].blocks[payload.blockIndex].options.splice(payload.optionIndex, 1);
  },
  updateCheckbox (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, same(payload.newData));
  },
  cancelUpdateBlock (state, payload) {
    state.course.pages[payload.pageIndex].blocks.splice(payload.blockIndex, 1, same(payload.oldData));
  }
};
