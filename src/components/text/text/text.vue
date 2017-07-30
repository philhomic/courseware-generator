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
          span(contenteditable ref="userAnswer" @change="updateUserAnswer" class="userInput")
          span(v-if='submitted && data.assess.answer && !answerCorrect(data, userAnswer)') ( {{data.assess.answer}} )
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
        this.userAnswer = this.$refs.userAnswer.innerText;
        console.log(this.$refs.userAnswer);
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .block-wrapper.textQuestion
    .question.block
      .inner
        .input
          span.userInput
            display: inline-block
            min-width: 100px
            border-bottom: 1px solid #e0e0e0

</style>
