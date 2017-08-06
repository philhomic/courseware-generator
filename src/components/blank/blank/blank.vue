<template lang="pug">
  .block-wrapper.border-1px.blank
    .question.block
      .inner
        questionNumber(:idx="data.questionNumber")
        // 题目标题
        .title(ref="title")
          span(v-for="item in data.titleData")
            span(v-if="item.type==='text'") {{item.data}}
            span.input(v-else-if="item.type==='blank'" :class="{'submitted': submitted}")
              span(contenteditable ref="userAnswer" @input="updateUserAnswer(item.id)" class="userInput" :id="item.id")
              span(class="correctAnswer" v-if='submitted && data.assess.answers[item.id] && !answerCorrect(data, item.id)') &nbsp;&nbsp;({{data.assess.answers[item.id][0]}})&nbsp;&nbsp;
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
      answerCorrect: function (data, id) {
        return data.assess.answers[id].indexOf(this.userAnswers[id].trim()) !== -1;
      },
      updateUserAnswer: function (id) {
        let userAnswer = document.getElementById(id);
        this.$set(this.userAnswers, id, userAnswer.innerText);
        if (userAnswer.clientWidth <= 60) {
          userAnswer.style.display = 'inline-block';
        } else {
          userAnswer.style.display = 'inline';
        }
      },
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
    },
    data () {
      return {
        userAnswers: {},
        hasDone: !!this.userAnswers,
        doneCorrect: this.answerCorrect
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/stylus/base.styl'
  .block-wrapper.blank
    .question.block
      .inner
        .title
          span
            display: inline
            .input
              span.userInput, span.correctAnswer
                display: inline-block
                min-width: 60px
                border-bottom: 2px solid #eee
                line-height: $block-title-line-height
                font-size: $block-title-font-size
              span.correctAnswer
                color: rgb(212, 90, 0)
                font-family: $block-title-font-family
                border-bottom: none
                display: inline
</style>
