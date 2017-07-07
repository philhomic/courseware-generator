<template>
  <div class='question question_radio'>
    <div class='inner'>
      <div class='title' v-if='this.title' v-html='unescapeHTML(title)'></div>
      <div class='description' v-if='this.description' v-html="unescapeHTML(description)"></div>
      <div class='options'>
        <div class='option-item' v-for="(item, index) in options">
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
        if (str === '' || str === null) {
          return '';
        }
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
        title: '&lt;p&gt;In this section, you will hear a long conversation.&lt;/p&gt;',
        description: '&lt;p&gt;At the end of the conversation, three or four questions will be asked about what was said. &lt;/p&gt;',
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
          text: '&lt;p&gt;At the wedding ceremony.&lt;/p&gt; '
        }, {
          id: 'o-101-EFGH',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;At the girl’s home.&lt;/p&gt; '
        }, {
          id: 'o-2-dpDK',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;At the boy’s home.&lt;/p&gt; '
        }, {
          id: 'o-3-1Mw2',
          goto: '',
          display: [],
          noRandom: false,
          text: '&lt;p&gt;At the home of one of the boy’s relatives.&lt;/p&gt; '
        }],
        id: 'q-1-Ddbn'
      };
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .question
    width: 100%
    max-width: 710px
    min-width: 320px
    margin-left: auto
    margin-right: auto
    padding: 10px 0
    .inner
      position: relative
      margin-left: 10px
      margin-right: 10px
      font-family: RobotoSlab, "Microsoft YaHei"
      .title
        margin: 5px 0
        font-size: 16px
        line-height: 28px
      .description
        position: relative
        padding: 16px
        margin: 15px 0
        line-height: 20px
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
      .options
        line-height: 20px
        font-size: 0
        .option-item
          vertical-align: top
          padding: 12px 0
          .option-index
            width: 24px
            float: left
            font-size: 16px
            font-family: RobotoCondensedBold
            background-color: #eee
            text-align: center
          .option-text
            margin-left: 30px
            font-size: 16px

</style>
