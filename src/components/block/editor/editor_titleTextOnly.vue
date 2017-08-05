<template lang="pug">
include editor_titleTextOnly.pug
</template>

<script type="text/ecmascript-6">
import {cleanHTML, cleanHTMLCompletely} from '@/assets/js/util';
export default {
  mounted () {
    if (this.data.isRequired) {
      this.$refs.isRequired.options[0].selected = true;
    } else {
      this.$refs.isRequired.options[1].selected = true;
    }
    if (this.data.isScored) {
      this.$refs.isScored.options[0].selected = true;
    } else {
      this.$refs.isScored.options[1].selected = true;
    }
  },
  methods: {
    toggleAdvSetting () {
      this.showAdvSetting = !this.showAdvSetting;
    },
    toggleIsRequired () {
      this.$store.commit('toggleIsRequired', {
        pageIndex: this.$parent.pageIndex,
        blockIndex: this.blockIndex,
        isRequired: !!parseInt(this.$refs.isRequired.value)
      });
    },
    toggleIsScored () {
      this.$store.commit('toggleIsScored', {
        pageIndex: this.$parent.pageIndex,
        blockIndex: this.blockIndex,
        isScored: !!parseInt(this.$refs.isScored.value)
      });
    },
    cleanHTML (htmlstring) {
      return cleanHTML(htmlstring);
    },
    cleanHTMLCompletely (htmlstring) {
      return cleanHTMLCompletely(htmlstring);
    }
  },
  data () {
    return {
      showAdvSetting: false
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
