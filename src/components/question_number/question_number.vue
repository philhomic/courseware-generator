<!--题目编号-->
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
    @import 'styleA'
</style>
