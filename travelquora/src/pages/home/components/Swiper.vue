<template>
    <div class="wrapper">
        <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="item of swiperList" :key="item.id">
            <img class="swiper-img" :src="item.imgUrl">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'HomeSwiper',
        data () {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true
                },
                swiperList: [{
                    id: '0001',
                    imgUrl: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20196/7ea90b7bd72642e834ced3953e231e5e.jpg_750x200_b0c66e21.jpg'
                },{
                    id: '0002', 
                    imgUrl: 'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20197/e02cceb2dbbfcd2871cdb7531cf311f1.jpg_750x200_63d3d88b.jpg'
                }]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    
    .wrapper >>> .swiper-pagination-bullet-active
        background: #fff !important 

    .wrapper
        overflow: hidden
        width: 100%
        height: 0
        padding-bottom: 26.668%
        background: #eee
        .swiper-img
            width: 100%
            
</style>