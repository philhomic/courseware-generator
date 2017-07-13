export default {
  page: {
    id: '',
    blocks: [],
    questionCount: 0
  },
  radio: {
    type: 'radio',
      title: '单选题',
      description: '单选题备注',
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
      explanation: '单选题解析',
      id: ''
  },
  checkbox: {
    type: 'checkbox',
    title: '多选题',
    description: '多选题备注',
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
    explanation: '多选题解析',
    id: ''
  }
};
