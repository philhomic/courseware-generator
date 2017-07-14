import Hashids from 'hashids';

function blockGuid (pageIndex, blockIndex) {
    return new Hashids(pageIndex, blockIndex, 8);
};
function optionGuid (pageIndex, blockIndex, optionIndex) {
  return new Hashids(pageIndex, blockIndex, optionIndex, 10);
};

export {
  blockGuid,
  optionGuid
};
