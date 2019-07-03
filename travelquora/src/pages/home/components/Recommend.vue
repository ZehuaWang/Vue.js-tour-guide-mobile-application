<template>
    <div>
        <div class="title">热销推荐</div>
        <ul>
            <li class="item">
                
                    <img class="item-img" src="http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_200x200_1bc99086.jpg" />
                
                <div class="item-info">
                    <p class="item-title"></p>
                    <p class="item-desc"></p>
                    <button class="item-button">查看详情</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HomeRecommend'
    }
</script>

<style lang="stylus" scoped>

    .title
        margin-top:   .2rem
        line-height:  .8rem
        background :  #ddd
        text-indent : .2rem
    .item
        overflow : hidden
        display : flex
        height: 1.9rem
        .item-img
            width: 1.7rem
            height: 1.7rem
            padding: .1rem

</style>