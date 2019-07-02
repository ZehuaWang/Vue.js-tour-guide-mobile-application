<template>

    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide>
        <img class="swiper-img" src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20196/7ea90b7bd72642e834ced3953e231e5e.jpg_750x200_b0c66e21.jpg">
    </swiper-slide>
    <swiper-slide>
        <img class="swiper-img" src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20197/e02cceb2dbbfcd2871cdb7531cf311f1.jpg_750x200_63d3d88b.jpg">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>

</template>

<script>
    export default {
        name: 'HomeSwiper',
        data() {
            return {
                swiperOption: {}
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .swiper-img
        width: 100%

</style>