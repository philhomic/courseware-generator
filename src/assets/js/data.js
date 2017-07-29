
let page = {
  id: '',
  blocks: []
};

let unit = {
  id: '',
  title: '',
  pages: [page]
};

let course = {
  id: '',
  title: '',
  units: [unit]
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
  showOptionIndex: true,
  questionNumber: 0
};

let checkbox = JSON.parse(JSON.stringify(radio).replace('单选题', '多选题'));
checkbox.type = 'checkbox';

let selectsingle = JSON.parse(JSON.stringify(radio).replace('单选题', '下拉题'));
selectsingle.type = 'selectsingle';
selectsingle.options[0].text = '选项1';
selectsingle.options[1].text = '选项2';

let description = {
  type: 'description',
  title: '&lt;p&gt;段落说明&lt;/p&gt;',
  description: '&lt;p&gt;备注&lt;/p&gt;',
  id: ''
};

export default {
  course,
  unit,
  page,
  radio,
  selectsingle,
  checkbox,
  description
};
