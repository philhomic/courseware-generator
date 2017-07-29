<template lang="pug">
  extends ../choice_base.pug
  block options
    questionNumber(:idx="data.questionNumber")
    .selectWrapper(:class="{'doneCorrect': doneGood, 'doneWrong': !doneGood, 'submitted': submitted, 'hasDone': hasDone}")
      select.options(:id='data.id' @change="selectOption" ref="select")
        option.option-item(disabled selected) --请选择--
        option.option-item(
          v-for="(item, index) in data.options"
          ref='optionItems'
          :value="item.id"
          :class="{'selected': isSelected(item.id), 'right-answer':isRightAnswer(data, item.id), 'correct': isCorrect(data, item.id), 'wrong': isWrong(data, item.id)}"
        ) {{item.text}}
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';
  export default {
    extends: radio,
    methods: {
      selectOption () {
        this.selectedId = this.$refs.select.value;
        this.hasDone = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../radio/radio.styl'

  .block-wrapper
    .block
      .inner
        .selectWrapper
          position: relative
          display: inline-block
          margin-bottom: 20px
          select.options
            font-size: 14px
          &.submitted.hasDone.doneCorrect
            &:after
              display: block
              position: absolute
              right: -10px
              bottom: -12px
              content: "\ea10"
              font-size: 20px
              font-family: 'cw'
              color: $question-option-index-bgcolor-selected-correct
            select
              border: 3px solid $question-option-index-bgcolor-selected-correct
          &.submitted.hasDone.doneWrong
            &:after
              display: block
              position: absolute
              right: -10px
              bottom: -12px
              font-size: 20px
              content: "\ea0f"
              font-family: 'cw'
              color: $question-option-index-bgcolor-selected-wrong
            select
              border: 3px solid $question-option-index-bgcolor-selected-wrong
</style>
