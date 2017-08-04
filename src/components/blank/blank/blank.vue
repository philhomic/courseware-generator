<template lang="pug">
  .block-wrapper.border-1px
    .question.block
      .inner
        questionNumber(:idx="data.questionNumber")
        // 题目标题
        .title(v-if='hasContent(data.title)' v-html='cleanHTML(data.title)')
        // 题目备注
        .description(v-if='hasContent(data.description)' v-html="cleanHTML(data.description)")
        // 题目选项
        block blanks
        // 题目解析
        transition(name="slide")
          .explanation(v-if='hasContent(data.explanation) && submitted')
            i.icon-key
            .explanation-text(v-html="cleanHTML(data.explanation)")
</template>

<script type="text/ecmascript-6">
  import {cleanHTML, hasContent} from '@/assets/js/util';
  import questionNumber from '@/components/question_number/question_number';

  // 以单选题的业务逻辑作为基础模板
  export default {
    // props 所有选择题型通用
    props: {
      data: {
        type: Object
      },
      submitted: {
        default: false,
        type: Boolean
      }
    },
    components: {
      questionNumber
    },
    methods: {
      cleanHTML: function (str) {
        return cleanHTML(str);
      },
      hasContent: function (htmlString) {
        return hasContent(htmlString);
      },
      // 判断选择正确，所有选择题型通用
      selectCorrect: function (data, id) {
        return data.assess.options[id] && data.assess.options[id].flag === true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
