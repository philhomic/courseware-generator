<!--单选题-->
<template lang="pug">
    include choiceEditor_base.pug
</template>

<script type='text/ecmascript-6'>
    import {clone, escapeHTML, unescapeHTML} from '@/assets/js/util';

    let oldData;

    export default {
        props: {
            data: {
                type: Object
            },
            blockIndex: {
                type: Number
            }
        },
        data () {
            return {
                showAdvSetting: false
            };
        },
        mounted () {
            oldData = clone(this.data);
            this.$refs.columnCount.options[this.data.columnCount - 1].selected = true;
            if (this.data.showOptionIndex) {
                this.$refs.toggleOptionIndex.options[0].selected = true;
            } else {
                this.$refs.toggleOptionIndex.options[1].selected = true;
            }
        },
        methods: {
            unescapeHTML (string) {
                return unescapeHTML(string);
            },
            addAnswer (optionId, type) {
                this.$store.commit('addAnswer', {
                    type: type,
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    optionId: optionId
                });
            },
            changeColumnCount () {
                this.$store.commit('changeColumnCount', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    columnCount: parseInt(this.$refs.columnCount.value)
                });
            },
            addOption (optionIndex) {
                this.$store.commit('addOption', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    optionIndex: optionIndex
                });
            },
            deleteOption (optionIndex) {
                this.$store.commit('deleteOption', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    optionIndex: optionIndex
                });
            },
            updateCheckbox () {
                let newData = clone(this.data);
                let title = this.$refs.title;
                let description = this.$refs.description;
                let explanation = this.$refs.explanation;
                let options = this.$refs.options;
                let columnCount = parseInt(this.$refs.columnCount.value);

                newData.title = escapeHTML(title.innerHTML);
                newData.description = escapeHTML(description.innerHTML);
                newData.explanation = escapeHTML(explanation.innerHTML);
                newData.options.forEach((option, index) => {
                    option.text = escapeHTML(options[index].innerHTML);
                });
                newData.columnCount = columnCount;

                this.$store.commit('updateCheckbox', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    newData: newData
                });
                oldData = JSON.parse(JSON.stringify(newData));
                this.$emit('stopEditing');
            },
            cancelUpdateBlock () {
                this.$store.commit('cancelUpdateBlock', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    oldData: oldData
                });
                this.$emit('stopEditing');
            },
            isChecked (option) {
                let assessOption = this.data.assess.options[option.id];
                if (assessOption && assessOption.flag === true) {
                    return true;
                } else {
                    return false;
                }
            },
            toggleAdvSetting () {
                this.showAdvSetting = !this.showAdvSetting;
            },
            toggleOptionIndex () {
                this.$store.commit('toggleOptionIndex', {
                    pageIndex: this.$parent.pageIndex,
                    blockIndex: this.blockIndex,
                    showOptionIndex: !!parseInt(this.$refs.toggleOptionIndex.value)
                });
            }
        }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import './choiceEditor_base'
</style>
