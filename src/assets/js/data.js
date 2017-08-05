
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

// 每一种问题类型都会有的一些共有属性
let questionBase = {
  id: '',
  isQuestion: true,
  questionNumber: 0, // 用于记录问题编号
  isRequired: true, // 用于记录该问题是否必答
  isScored: true // 用于记录该问题是否计分
};

let radio = {
  type: 'radio',
  title: '&lt;p&gt;单选题&lt;&#x2f;p&gt;',
  description: '&lt;p&gt;单选题备注&lt;&#x2f;p&gt;',
  assess: {
    options: {
      // id: {flag: true} 选择题对应id，然后后面立起flag为true的就是正确答案
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
  columnCount: 1,
  showOptionIndex: true
};

radio = Object.assign(radio, questionBase);

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

let textQuestion = {
  type: 'textQuestion',
  title: '&lt;p&gt;文本题&lt;/p&gt;',
  description: '&lt;p&gt;文本题备注&lt;/p&gt;',
  assess: {
    answers: ['答案1', '答案2']
  },
  explanation: '&lt;p&gt;文本题解析&lt;&#x2f;p&gt;'
};

textQuestion = Object.assign(textQuestion, questionBase);

let blank = {
  type: 'blank',
  title: '&lt;p&gt;填空题&lt;/p&gt;',
  description: '&lt;p&gt;填空题备注&lt;/p&gt;',
  assess: {
    answers: {
      // id : [answer1, answer2] 每个id针对一个空格，后面的中括号中的第一个答案就是原本原文中的文本
    }
  },
  explanation: '&lt;p&gt;填空题解析&lt;&#x2f;p&gt;'
};

blank = Object.assign(blank, questionBase);

export default {
  course,
  unit,
  page,
  radio,
  selectsingle,
  checkbox,
  description,
  textQuestion,
  blank
};
