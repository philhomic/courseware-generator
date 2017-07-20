<!--题目编号-->
<template>
    <div class="question-number">
        <hr>
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
    hr
      position: absolute
      top: 0px
      width: 100%
      margin: 0
      padding: 0
      background: $question-number-hr-color
      color: $question-number-hr-color
      height: 1px
      line-height: 1px
      font-size: 0
      border: none 0
      z-index: 1
      @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)
        -webkit-transform: scaleY(0.7)
        transform: scaleY(0.7)
      @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
        -webkit-transform: scaleY(0.5)
        transform: scaleY(0.5)
</style>
