<template lang="pug">
  .block-wrapper
    .question.block
      .inner
        .title(v-if='hasContent(data.title)' v-html='cleanHTML(data.title)')
        .description(v-if='hasContent(data.description)' v-html="cleanHTML(data.description)")
</template>

<script type="text/ecmascript-6">
  import {cleanHTML, hasContent} from '@/assets/js/util';

  export default {
    props: {
      data: {
        type: Object
      },
      submitted: {
        default: false,
        type: Boolean
      }
    },
    methods: {
      cleanHTML: function (str) {
        return cleanHTML(str);
      },
      hasContent: function (htmlString) {
        return hasContent(htmlString);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
