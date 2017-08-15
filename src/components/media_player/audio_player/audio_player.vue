<template lang="pug">
  .block-wrapper
    .block
      .inner
        audio(controls="controls") Your browser does not support the #[code audio] element.
          source(src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" type="audio/wav")
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .block-wrapper
    .block
      .inner
        audio
          width: 100%
</style>
