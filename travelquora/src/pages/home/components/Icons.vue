<template>
    <div class="icons">
        <swiper>
            <swiper-slide v-for="(page,index) of pages" :key="index">    
                <div class="icon" v-for="item of page" :key="item.id">
                    <div class="icon-img">
                        <img class='icon-img-content' :src='item.imgUrl'>
                    </div>
                    <p class="icon-desc">{{item.desc}}</p>
                </div>
            </swiper-slide>
        </swiper>                                               
    </div>
</template>

<script>
    export default {
        name: 'HomeIcons',
        data() {
            return {
                iconList: [{id:'0001',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',desc:'热门景点'},
                {id:'0002',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',desc:'北京故宫'},
                {id:'0003',imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png',desc:'北京必游'},
                {id:'0004',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/3e/86314b2af03b7502.png',desc:'水上乐园'},
                {id:'0005',imgUrl:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20191/0334cf5430b9b5505fd79e2b8d7e8670.png',desc:'长城游览'},
                {id:'0006',imgUrl:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/338c5b924c5809e8c7b14f60a953c3e2.png',desc:'欢乐谷'},
                {id:'0007',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png',desc:'动植物园'},
                {id:'0008',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/fa/2548667cb6e902.png',desc:'野生动物'},
                {id:'0009',imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/f5/c4c9d9830404e602.png',desc:'室内娱乐'}
                ]
            }
        },
        computed:{
            pages() {
                const pages = []
                this.iconList.forEach((item,index) => {
                    const page = Math.floor(index / 8)
                    if(!pages[page]) {
                        pages[page] = []
                    }
                    pages[page].push(item)
                })
                return pages
            } 
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    @import '~styles/mixins.styl'
    .icons >>> .swiper-container
        height : 0
        padding-bottom: 50%
    .icon
        position : relative
        float: left
        width: 25%
        height: 0
        padding-bottom: 25%
        
        .icon-img
            position : absolute
            top: 0
            left: 0
            right: 0
            bottom: .44rem
            box-sizing: border-box
            padding : .1rem
            
            .icon-img-content
                display : block
                margin : 0 auto
                height: 100%
        .icon-desc
            position: absolute
            left: 0
            right: 0
            bottom: 0
            height: .44rem
            text-align: center
            line-height : .44rem
            color: $darkTextColor
            ellipsis()

</style>