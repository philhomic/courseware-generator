<!--题目编号-->
<template>
    <div class="question-number">
        <div class="num">{{idx}}.</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            idx: {
                type: Number,
                default: 1,
                required: true
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/base'
  .question-number
    position: absolute
    left: -18px
    top: 0
    /*height: 20px*/
    .num
      /*position: absolute*/
      /*top: 0px*/
      /*left: 0*/
      height: 28px
      line-height: 28px
      background-color: $question-number-bgcolor
      color: $question-number-color
      text-align: center
      font-size: 14px
      z-index: 100
      font-family: $question-number-text-font-family
      font-weight: 700
</style>
