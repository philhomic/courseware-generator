<!--题目编号-->
<template>
    <div class="question-number">
        <div class="num">{{idx}}</div>
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
    position: relative
    height: 20px
    .num
      position: absolute
      top: 0px
      left: 0
      width: 40px
      height: 22px
      line-height: 22px
      background-color: $question-number-bgcolor
      text-align: center
      font-size: 14px
      z-index: 100
      font-family: $question-number-text-font-family
</style>
