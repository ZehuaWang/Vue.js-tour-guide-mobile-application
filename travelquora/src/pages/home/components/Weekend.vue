<template>
    <div>
        <div class="title">周末去哪</div>
        <ul>
            <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
                <div class="item-img-wrapper">    
                    <img class="item-img" :src='item.imgUrl' />
                </div>
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                    
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HomeWeekend',
        data () {
            return {
            recommendList: [{
                id: '0001',
                imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
                title: '京城周末撒欢',
                desc: '在帝都过周末，不仅仅是城中游'
            },{
                id: '0002',
                imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
                title: '北京欢乐谷',
                desc: '亚洲唯一飞行式过山车等你来挑战'
            },{
                id: '0003',
                imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
                title: '长城',
                desc: '不到长城非好汉'
            }]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/mixins.styl'
    .title
        margin-top:   .2rem
        line-height:  .8rem
        background :  #ddd
        text-indent : .2rem
    .item-img-wrapper
        overflow : hidden
        height:0
        padding-bottom: 33.9%
        .item-img
            width : 100%
    .item-info
        padding: .1rem
        .item-title
            line-height: .54rem
            font-size: .32rem
        .item-desc
            line-height : .4rem
            color: #ccc
            ellipsis()
</style>