<template lang="pug">
  extends ../choice_base.pug
  block options
    .selectWrapper(:class="{'doneCorrect': doneGood, 'doneWrong': !doneGood}")
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../radio/radio.styl'

  .block-wrapper
    .block
      .inner
        margin-bottom: 40px
        .selectWrapper
          position: relative
          display: inline-block
          select.options
            font-size: 14px
    .block.submitted
      .inner
        .selectWrapper.doneCorrect
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
        .selectWrapper.doneWrong
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
