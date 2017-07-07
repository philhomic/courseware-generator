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
        type: String,
        default: '1',
        required: true
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .question-number
    position: relative
    height: 20px
    .num
      position: absolute
      top: 0
      left: 0
      width: 40px
      height: 22px
      line-height: 22px
      background-color: #eee
      text-align: center
      font-size: 14px
      z-index: 100
      font-family: RobotoCondensed
    hr
      position: absolute
      top: 11px
      width: 100%
      margin: 0
      padding: 0
      background: #ddd
      color: #ddd
      height: 1px
      line-height: 1px
      font-size: 0
      border: none 0
      z-index: 1
</style>
