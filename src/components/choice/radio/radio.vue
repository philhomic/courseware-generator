<template lang="pug">
    extends ../choice_base.pug
    block options
        .options(:id='data.id')
            .option-item(
                v-for="(item, index) in data.options"
                ref='optionItems'
                @click="selectOption(item.id)"
                :class="{'selected': isSelected(item.id), 'right-answer': isRightAnswer(data, item.id), 'correct': isCorrect(data, item.id), 'wrong': isWrong(data, item.id)}")
                input.checkbox(type="radio" :id="item.id" :name="data.id")
                label.option-item-label.clearfix(:for="item.id" ref='optionItemLabels')
                    span.option-index {{idxToLetter(index)}}
                    .option-text(v-html="unescapeHTML(item.text)")
</template>

<script type="text/ecmascript-6">
    import choiceBase from '@/components/choice/choice_base';

    export default {
        extends: choiceBase,
        methods: {
            selectOption: function (id) {
                this.selectedId = id;
            },
            isSelected: function (id) {
                return this.selectedId === id;
            },
            isRightAnswer: function (data, id) {
              return this.submitted && this.selectedId !== '' && this.selectCorrect(data, id);
            },
            isCorrect: function (data, id) {
              return this.submitted && this.isSelected(id) && this.selectCorrect(data, id);
            },
            isWrong: function (data, id) {
              return this.submitted && this.isSelected(id) && !this.selectCorrect(data, id);
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../choice_base'

    .block-wrapper
      .question
        .inner
          .options
            line-height: 20px
            font-size: 0
            .option-item
              display: inline-block
              box-sizing: border-box
              width: 100%
              .checkbox
                display: none
              .option-item-label
                display: block
                vertical-align: top
                padding: 12px 0
                overflow: hidden
                cursor: pointer
                .option-index
                  width: 24px
                  height: 24px
                  border-radius: 50%
                  float: left
                  font-size: 16px
                  line-height: 24px
                  font-family: $question-option-index-font-family
                  color: $question-option-index-color
                  background-color: $question-option-index-bgcolor
                  text-align: center
                .option-text
                  margin-left: 30px
                  padding-right: 10px
                  font-size: 16px
                  line-height: 24px
                  color: $question-option-text-color
                  img
                    max-width: 100%
              &.selected .option-index
                color: $question-option-index-color-selected
                background-color: $question-option-index-bgcolor-selected
        &.submitted
          .option-item.selected.correct, .option-item.right-answer
            .option-index
              background-color: $question-option-index-bgcolor-selected-correct !important
              color: $question-option-index-color-selected-correct !important
          .option-item.selected.wrong
            .option-index
              background-color: $question-option-index-bgcolor-selected-wrong !important
              color: $question-option-index-color-selected-wrong !important
</style>
