<!--单选题-->
<template>
    <div class='question question_radio' :class="{'submitted': submitted}">
        <div class='inner'>
            <div class='title' v-if='data.title' v-html='unescapeHTML(data.title)'></div>
            <div class='description' v-if='data.description' v-html="unescapeHTML(data.description)"></div>
            <div class='options' :id='data.id'>
                <div class='option-item' v-for="(item, index) in data.options" ref='optionItems'
                     @click="selectOption(item.id)"
                     :class="{'selected': isSelected(item.id), 'right-answer': submitted && selectedId !== '' && selectCorrect(data, item.id), 'correct': submitted && isSelected(item.id) && selectCorrect(data, item.id), 'wrong': submitted && isSelected(item.id) && !selectCorrect(data, item.id)}">
                    <input class="checkbox" type="radio" :id="item.id" :name="data.id">
                    <label :for="item.id" class="option-item-label clearfix" ref='optionItemLabels'>
                        <span class="option-index">{{idxToLetter(index)}}</span>
                        <div class="option-text" v-html="unescapeHTML(item.text)"></div>
                    </label>
                </div>
            </div>
            <transition name="slide">
                <div class='explanation' v-if='data.explanation && selectedId !== "" && submitted'>
                    <i class="icon-key"></i>
                    <div class="explanation-text" v-html="unescapeHTML(data.explanation)"></div>
                </div>
            </transition>
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
                default: 1,
                type: Number
            },
            submitted: {
                default: false,
                type: Boolean
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
            switch (this.colNum) {
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
    @import 'styleA'
</style>
