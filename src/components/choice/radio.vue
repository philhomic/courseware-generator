<template lang="pug">
    extends choice_base.pug
    block options
        .options(:id='data.id')
            .option-item(
                v-for="(item, index) in data.options"
                ref='optionItems'
                @click="selectOption(item.id)"
                :class="{'selected': isSelected(item.id), 'right-answer': submitted && selectedId !== '' && selectCorrect(data, item.id), 'correct': submitted && isSelected(item.id) && selectCorrect(data, item.id), 'wrong': submitted && isSelected(item.id) && !selectCorrect(data, item.id)}"
            )
                input.checkbox(type="radio" :id="item.id" :name="data.id")
                label.option-item-label.clearfix(:for="item.id" ref='optionItemLabels')
                    span.option-index {{idxToLetter(index)}}
                    .option-text(v-html="unescapeHTML(item.text)")
</template>

<script type="text/ecmascript-6">
    import choiceBase from '@/components/choice/choice_base';
    export default {
        extends: choiceBase
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'styleA'
</style>
