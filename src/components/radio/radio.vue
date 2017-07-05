<template>
  <div class='question question_radio'>
    <div class='num'>1</div>
    <div class='inner'>
      <div class='title' v-show='this.title' v-html='unescapeHTML(title)'></div>
      <div class='description' v-show='this.description' v-html="unescapeHTML(description)"></div>
      <div class='options'>
        <div class='option_item' v-for="(item, index) in options">
          <span class="option-index">{{idxToLetter(index)}})</span>
          <div class="option-text" v-html="unescapeHTML(item.text)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  const unescapeHTMLMap = {
    '&': /&amp;/g,
    '<': /&lt;/g,
    '>': /&gt;/g,
    '"': /&quot;/g,
    '\'': /&apos;/g,
    '/': /&#x2f;/g
  };
  const letterMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  export default {
    methods: {
      unescapeHTML: function (str) {
        str = str.replace(/&#(x)?([\w\d]{0,5});/ig, function (full, hex, code) {
          return String.fromCharCode(parseInt(code, hex ? 16 : 10));
        });

        for (var src in unescapeHTMLMap) {
          str = str.replace(unescapeHTMLMap[src], src);
        }

        return str;
      },
      idxToLetter: function (idx) {
        return letterMap[idx];
      }
    },
    data () {
      return {
        type: 'radio',
        title: '&lt;p&gt;单选题,如果让你只能选一个男歌星来听，你怎么选？&lt;/p&gt;',
        description: '&lt;p&gt;单选题备注&lt;/p&gt; ',
        required: true,
        goto: '',
        assess: {
          type: 0,
          score: 1,
          options: {
            'o-101-EFGH': {
              flag: true
            }
          }
        },
        options: [{
          id: 'o-100-ABCD',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;选项1&lt;/p&gt; '
        }, {
          id: 'o-101-EFGH',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;选项2&lt;/p&gt; '
        }, {
          id: 'o-2-dpDK',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;选项3&lt;/p&gt; '
        }, {
          id: 'o-3-1Mw2',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;选项4&lt;/p&gt; '
        }],
        id: 'q-1-Ddbn'
      };
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .question
    .num
      display: inline-block
      height: 20px
      padding: 0 10px
      font-size: 12px
      font-weight: 700
      color: #777
      line-height: 20px
      background: yellow
    .inner
      position: relative
      margin-left: auto
      margin-right: auto
      padding-left: 10px
      padding-right: 10px
      max-width: 710px;
      .title
        margin: 5px 0 8px 0
        font-size: 16px
        line-height: 1.8em
      .description
        position: relative
        padding: 5px 10px
        line-height: 1.8em
        font-size: 14px
        border-radius: 3px
        background-color: #eee
        &:before
          content: ''
          display: block
          position: absolute
          top: -10px
          left: 10px
          border-bottom: 10px solid #eee
          border-left: 5px solid transparent
          border-right: 5px solid transparent
          width: 0
          height: 0
</style>
