<template lang="pug">
include editor_titleTextOnly.pug
</template>

<script type="text/ecmascript-6">
import {unescapeHTML} from '@/assets/js/util';
import editor from './editor.vue';
export default {
  extends: editor,
  computed: {
    cleanTitle () {
      let div = document.createElement('div');
      div.innerHTML = unescapeHTML(this.data.title);
      return div.innerText;
    }
  },
  methods: {
    handleBlur (ev) {
      ev.target.innerHTML = ev.target.innerText;
      // 解决重新赋值后，光标的位置问题，否则光标总是跑到最前面去
//      if (navigator.userAgent.indexOf('MSIE') > -1) {
//        let range = document.selection.createRange();
//        ev.target.last = range;
//        range.moveToElementText(ev.target);
//        range.select();
//        document.selection.empty();
//      } else {
//        let range = document.createRange();
//        range.selectNodeContents(ev.target);
//        range.collapse(false);
//        let sel = window.getSelection();
//        sel.removeAllRanges();
//        sel.addRange(range);
//      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
