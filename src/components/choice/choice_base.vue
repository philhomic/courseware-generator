<!--单选题-->
<template lang="pug">
    include choice_base.pug
</template>

<script type='text/ecmascript-6'>
    import {unescapeHTML, idxToLetter} from '@/assets/js/util';

    // 以单选题的业务逻辑作为基础模板
    export default {
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
            selectOption: function (id) {
                this.selectedId = id;
            },
            isSelected: function (id) {
                return this.selectedId === id;
            },
            selectCorrect: function (data, id) {
                return data.assess.options[id] && data.assess.options[id].flag === true;
            }
        },
        data () {
            return {
                selectedId: ''
            };
        },
        mounted () {
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
</style>
