<template lang="pug">
  extends ../choice_base.pug
  block options
    .options(:id='data.id' :class="{'no-option-index': !data.showOptionIndex}")
      .option-item(
        v-for="(item, index) in data.options"
        ref='optionItems' @click.stop.prevent="selectOption(item.id)"
        :class="{'selected': isSelected(item.id), 'right-answer':isRightAnswer(data, item.id), 'correct': isCorrect(data, item.id), 'wrong': isWrong(data, item.id)}"
      )
        input.checkbox(type="checkbox" :id="item.id" :name="data.id")
        label(:for="item.id" class="option-item-label clearfix" ref='optionItemLabels')
          span.option-index(v-if="data.showOptionIndex") {{idxToLetter(index)}}
          .option-text(v-html="unescapeHTML(item.text)")
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';

  export default {
    extends: radio,
    methods: {
      selectOption: function (id) {
        var i = this.selectedId.indexOf(id);
        if (i < 0) {
          this.selectedId.push(id);
        } else {
          this.selectedId.splice(i, 1);
        }
      },
      isSelected: function (id) {
        return this.selectedId.indexOf(id) >= 0;
      },
      isRightAnswer: function (data, id) {
        return this.submitted && this.selectedId.length !== 0 && this.selectCorrect(data, id);
      }
    },
    computed: {
      doneGood: function () {
        this.selectedId.forEach(function (id, index) {
          if (!this.selectedCorrect(this.data, id)) {
            return false;
          }
        });
        return true;
      }
    },
    data () {
      return {
        selectedId: [],
        doneCorrect: this.doneGood
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../radio/radio.styl'
</style>
