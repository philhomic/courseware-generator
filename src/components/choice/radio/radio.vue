<template lang="pug">
    extends ../choice_base.pug
    block options
      questionNumber(:idx="data.questionNumber")
      .options(:id='data.id' :class="{'no-option-index': !data.showOptionIndex, 'submitted': submitted}")
        .option-item(
          v-for="(item, index) in data.options"
          ref='optionItems'
          @click="selectOption(item.id)"
          :class="{'selected': isSelected(item.id), 'right-answer':isRightAnswer(data, item.id), 'correct': isCorrect(data, item.id), 'wrong': isWrong(data, item.id)}"
        )
          input.checkbox(type="radio" :id="item.id" :name="data.id")
          label.option-item-label.clearfix(:for="item.id" ref='optionItemLabels')
            span.option-index(v-if="data.showOptionIndex") {{idxToLetter(index)}}
            .option-text(v-html="unescapeHTML(item.text)")
</template>

<script type="text/ecmascript-6">
    import choiceBase from '@/components/choice/choice_base';

    export default {
        extends: choiceBase,
        methods: {
            selectOption: function (id) {
                this.selectedId = id;
                this.hasDone = true;
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
        },
        computed: {
          doneGood: function () {
            return this.selectCorrect(this.data, this.selectedId);
          }
        },
        data () {
            return {
                selectedId: '',
                hasDone: false,
                doneCorrect: this.doneGood
            };
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './radio'
</style>
