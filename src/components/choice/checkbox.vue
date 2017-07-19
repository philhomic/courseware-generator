<template lang="pug">
    extends choice_base.pug
    block options
        .options(:id='data.id')
            .option-item(v-for="(item, index) in data.options" ref='optionItems' @click.stop.prevent="selectOption(item.id)" :class="{'selected': isSelected(item.id), 'right-answer': submitted && selectedId.length !== 0 && selectCorrect(data, item.id), 'correct': submitted && isSelected(item.id) && selectCorrect(data, item.id), 'wrong': submitted && isSelected(item.id) && !selectCorrect(data, item.id)}")
                input.checkbox(type="checkbox" :id="item.id" :name="data.id")
                label(:for="item.id" class="option-item-label clearfix" ref='optionItemLabels')
                    span.option-index {{idxToLetter(index)}}
                    .option-text(v-html="unescapeHTML(item.text)")
</template>

<script type="text/ecmascript-6">
    import choiceBase from './choice_base';
    export default {
        extends: choiceBase,
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
            }
        },
        data () {
            return {
                selectedId: []
            };
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'styleA.styl'
</style>
