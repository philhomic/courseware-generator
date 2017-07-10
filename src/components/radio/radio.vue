<!--单选题-->
<template>
    <div class='question question_radio' :class="{'submitted': submitted}">
        <div class='inner'>
            <div class='title' v-if='data.title' v-html='unescapeHTML(data.title)'></div>
            <div class='description' v-if='data.description' v-html="unescapeHTML(data.description)"></div>
            <div class='options'>
                <div class='option-item clearfix' v-for="(item, index) in data.options" :id="item.id" ref='optionItems' @click="selectOption(index)" :class="{'selected': isSelected(index), 'correct': submitted && isSelected(index) && selectCorrect(data, item.id), 'wrong': submitted && isSelected(index) && !selectCorrect(data, item.id)}">
                    <span class="option-index">{{idxToLetter(index)}}</span>
                    <div class="option-text" v-html="unescapeHTML(item.text)"></div>
                </div>
            </div>
            <div class='explanation' v-if='data.explanation && submitted' v-html="unescapeHTML(data.explanation)"></div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    const unescapeHTMLMap = {
        '&': /&amp;/g,
        '<': /&lt;/g,
        '>': /&gt;/g,
        '"': /&quot;/g,
        '\'': /&apos;/g,
        '/': /&#x2f;/g
    };
    const letterMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    export default {
        props: {
            data: {
                type: Object
            },
            colNum: {
                default: '1',
                type: String
            }
        },
        methods: {
            unescapeHTML: function (str) {
                if (str === '' || str === null) {
                    return '';
                }
                str = str.replace(/&#(x)?([\w\d]{0,5});/ig, function (full, hex, code) {
                    return String.fromCharCode(parseInt(code, hex ? 16 : 10));
                });

                for (var src in unescapeHTMLMap) {
                    str = str.replace(unescapeHTMLMap[src], src);
                }

                return str;
            },
            idxToLetter: function (idx) {
                return letterMap[idx];
            },
            selectOption: function (index) {
                this.selectedIndex = index;
            },
            isSelected: function (index) {
                return this.selectedIndex === index;
            },
            selectCorrect: function (data, id) {
                return data.assess.options[id] && data.assess.options[id].flag === true;
            }
        },
        data () {
            return {
                selectedIndex: -1,
                submitted: true
            };
        },
        mounted () {
            switch (this.colNum) {
                case '2':
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '50%';
                    });
                    break;
                case '3':
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '33%';
                    });
                    break;
                case '4':
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '25%';
                    });
                    break;
                case '5':
                    this.$refs.optionItems.forEach((item) => {
                        item.style.width = '20%';
                    });
                    break;
            }
        }
    };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import 'styleA'
</style>
