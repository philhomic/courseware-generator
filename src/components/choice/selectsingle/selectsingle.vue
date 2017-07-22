<template lang="pug">
  extends ../choice_base.pug
  block options
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
                select.options
                    font-size: 14px
</style>
