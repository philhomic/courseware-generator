<template>
  <div id="app">
    <div class="page">
      <idx idx="1"></idx>
      <radio></radio>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import idx from '@/components/question_number/question_number';

  export default {
    name: 'app',
    components: {
      radio,
      idx
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .page
      width: 100%
      max-width: 1000px
      min-width: 320px
      margin-left: auto
      margin-right: auto
      background-color: #fff
</style>
