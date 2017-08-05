<template lang="pug">
  .page
    .header
    .blocks-wrapper(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
      <component :is="block.type" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block" :submitted="isSubmitted"></component>
    .footer(v-show="currentPage.blocks.length > 0")
      a(href="javascript:;" class="submitButton" @click="submitPage") 提 交
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';
  import checkbox from '@/components/choice/checkbox/checkbox';
  import selectsingle from '@/components/choice/selectsingle/selectsingle';
  import description from '@/components/description/description/description';
  import textQuestion from '@/components/text/text/text';
  import blank from '@/components/blank/blank/blank';

  export default {
    props: {
      data: {
        type: Object
      },
      pageIndex: {
        type: Number
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.course.units[this.$route.params.unitIndex - 1].pages[this.$route.params.pageIndex - 1];
      }
    },
    components: {
      radio,
      checkbox,
      selectsingle,
      description,
      textQuestion,
      blank
    },
    methods: {
      clone (json) {
        return JSON.parse(JSON.stringify(json));
      },
      submitPage () {
        this.isSubmitted = true;
      }
    },
    data () {
      return {
        isSubmitted: false
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/base'
@import '../../../assets/stylus/mixin'

.page
  position: relative
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin: 60px auto
  background-color: $app-bgcolor
  border-radius: 2px
  box-shadow: 0 2px 5px rgba(0,0,0,.2)
  .header
    position: fixed
    z-index: -1
    top: 0
    left: 0
    width: 100%
    height:120px
    background: $question-number-color
  //block的通用样式 title, description, explanation --start
  @import '../../../assets/stylus/block.styl'
  //block的通用样式 --end
  .footer
    background-color: rgb(248, 248, 248)
    text-align: right
    .submitButton
      display: inline-block
      background: rgb(213, 247, 251)
      padding: 15px 30px
      height: 24px
      line-height: 24px
      color: rgb(10, 125, 192);
      font-weight: 700
      transition: color .5s
      &:hover
        color: #fff
        background-color: rgb(10, 125, 192)
</style>
