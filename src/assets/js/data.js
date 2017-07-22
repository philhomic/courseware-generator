
let page = {
  id: '',
      blocks: []
};

let radio = {
  type: 'radio',
      title: '&lt;p&gt;单选题&lt;&#x2f;p&gt;',
      description: '&lt;p&gt;单选题备注&lt;&#x2f;p&gt;',
      assess: {
    options: {
    }
  },
  options: [{
    id: '',
    text: '&lt;p&gt;选项1&lt;&#x2f;p&gt;'
  }, {
    id: '',
    text: '&lt;p&gt;选项2&lt;&#x2f;p&gt;'
  }],
      explanation: '&lt;p&gt;单选题解析&lt;&#x2f;p&gt;',
      id: '',
      isQuestion: true,
      columnCount: 1,
      showOptionIndex: true
};

let selectsingle = {
  type: 'selectsingle',
  title: '&lt;p&gt;单选题&lt;&#x2f;p&gt;',
  description: '&lt;p&gt;单选题备注&lt;&#x2f;p&gt;',
  assess: {
    options: {
    }
  },
  options: [{
    id: '',
    text: '选项1'
  }, {
    id: '',
    text: '选项2'
  }],
  explanation: '&lt;p&gt;单选题解析&lt;&#x2f;p&gt;',
  id: '',
  isQuestion: true,
  columnCount: 1,
  showOptionIndex: true
};

let checkbox = JSON.parse(JSON.stringify(radio).replace('单选题', '多选题'));
checkbox.type = 'checkbox';

// let checkbox = {
//   type: 'checkbox',
//       title: '&lt;p&gt;多选题&lt;&#x2f;p&gt;',
//       description: '&lt;p&gt;多选题备注&lt;&#x2f;p&gt;',
//       assess: {
//     options: {
//     }
//   },
//   options: [{
//     id: '',
//     text: '&lt;p&gt;选项1&lt;&#x2f;p&gt;'
//   }, {
//     id: '',
//     text: '&lt;p&gt;选项2&lt;&#x2f;p&gt;'
//   }],
//       explanation: '&lt;p&gt;多选题解析&lt;&#x2f;p&gt;',
//       id: '',
//       isQuestion: true,
//       columnCount: 1,
//       showOptionIndex: true
// };

export default {
  page,
  radio,
  selectsingle,
  checkbox
};
