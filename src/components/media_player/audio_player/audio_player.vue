<template lang="pug">
  .block-wrapper
    .block
      .inner
        .audio
          audio Your browser does not support the #[code audio] element.
            source(src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" type="audio/wav")
          button.playButton
          .progress-control
            .progress-holder
              .load-progress
              .play-progress
                .playHead
          .time 1:00
          .speed 1X

</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/stylus/base.styl'
  .block-wrapper
    .block
      .inner
        .audio
          background-color: $app-basecolor
</style>
