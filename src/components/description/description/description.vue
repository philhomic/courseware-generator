<template lang="pug">
  .block-wrapper
    .question.block
      .inner
        .title(v-if='hasContent(data.title)' v-html='unescapeHTML(data.title)')
        .description(v-if='hasContent(data.description)' v-html="unescapeHTML(data.description)")
</template>

<script type="text/ecmascript-6">
  import {unescapeHTML, hasContent} from '@/assets/js/util';

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
      unescapeHTML: function (str) {
        return unescapeHTML(str);
      },
      hasContent: function (htmlString) {
        return hasContent(htmlString);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
