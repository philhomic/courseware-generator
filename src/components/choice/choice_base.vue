<!--单选题-->
<template lang="pug">
    include choice_base.pug
</template>

<script type='text/ecmascript-6'>
    import {unescapeHTML, idxToLetter, hasContent} from '@/assets/js/util';

    // 以单选题的业务逻辑作为基础模板
    export default {
        // props 所有选择题型通用
        props: {
            data: {
                type: Object
            },
            submitted: {
                default: false,
                type: Boolean
            },
            id: {
                default: '',
                type: String
            }
        },
        methods: {
            unescapeHTML: function (str) {
                return unescapeHTML(str);
            },
            idxToLetter: function (idx) {
                return idxToLetter(idx);
            },
            hasContent: function (htmlString) {
              return hasContent(htmlString);
            },
            // 判断选择正确，所有选择题型通用
            selectCorrect: function (data, id) {
                return data.assess.options[id] && data.assess.options[id].flag === true;
            }
        },
        mounted () {
            // 选项分列显示，radio 和 checkbox 通用，selectsingle 题型要重置
            switch (this.data.columnCount) {
                case 1:
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '100%';
                    });
                    break;
                case 2:
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '50%';
                    });
                    break;
                case 3:
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '33%';
                    });
                    break;
                case 4:
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '25%';
                    });
                    break;
                case 5:
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '20%';
                    });
                    break;
            }
        }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import './choice_base'
</style>
