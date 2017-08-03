<template lang="pug">
  .block-wrapper.border-1px.textQuestion
    .question.block
      .inner
        // 题目序号
        questionNumber(:idx="data.questionNumber")
        // 题目标题
        .title(v-if='hasContent(data.title)' v-html='unescapeHTML(data.title)')
        // 题目备注
        .description(v-if='hasContent(data.description)' v-html="unescapeHTML(data.description)")
        // 答案输入框
        .input(:class="{'submitted': submitted}")
          span(contenteditable ref="userAnswer" @input="updateUserAnswer" class="userInput")
          span(class="correctAnswer" v-if='submitted && data.assess.answer && !answerCorrect(data, userAnswer)') &nbsp;&nbsp;({{data.assess.answer}})
        // 题目解析
        transition(name="slide")
          .explanation(v-if='hasContent(data.explanation) && hasDone && submitted')
            i.icon-key
            .explanation-text(v-html="unescapeHTML(data.explanation)")
</template>

<script type="text/ecmascript-6">
  import {unescapeHTML, hasContent} from '@/assets/js/util';
  import questionNumber from '@/components/question_number/question_number';

  export default {
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
      unescapeHTML: function (str) {
        return unescapeHTML(str);
      },
      hasContent: function (htmlString) {
        return hasContent(htmlString);
      },
      answerCorrect: function (data, userAnswer) {
        return data.assess.answer === userAnswer;
      },
      updateUserAnswer: function () {
        let userAnswer = this.$refs.userAnswer;
        this.userAnswer = userAnswer.innerText;
        if (userAnswer.clientWidth <= 100) {
          userAnswer.style.display = 'inline-block';
        } else {
          userAnswer.style.display = 'inline';
        }
      }
    },
    data () {
      return {
        userAnswer: '',
        hasDone: this.userAnswer !== '',
        doneCorrect: this.answerCorrect
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .block-wrapper.textQuestion
    .question.block
      .inner
        .input
          span.userInput, span.correctAnswer
            display: inline-block
            min-width: 100px
            border-bottom: 2px solid #eee
            line-height: 30px
            font-size: 18px
          span.correctAnswer
            color: rgb(212, 90, 0)
            font-family: RobotoCondensedBold
            border-bottom: none
</style>

