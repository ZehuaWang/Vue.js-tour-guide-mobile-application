<template>
    <div class="container">
        <div class="wrapper">
            <swiper :options="swiperOptions">
            <!-- slides -->
            <swiper-slide>
                <img class="gallary-img" src="http://img1.qunarzz.com/wugc/p123/201211/19/a2045d091f02b25493835fbb.png_350x240_cf4cd08e.png">
            </swiper-slide>
            <swiper-slide>
                <img class="gallary-img" src="http://img1.qunarzz.com/sight/p0/1410/9d/fe8109ab5df1c9c324e74284fa802e72.water.jpg_350x240_8571d9ed.jpg">
            </swiper-slide>            
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            </div>
    </div>
</template>

<script>
export default {
    name: 'CommonGallary',
    data() {
        return {
            swiperOptions: {
                pagination: '.swiper-pagination',
                paginationType: 'fraction'
            }
        }
    }    
}
</script>

<style lang="stylus" scoped>
    .container
        display : flex
        flex-direction : column
        justify-content : center
        z-index: 99
        position : fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        background: #000
        .wrapper
            overflow : hidden
            height: 0
            width: 100%
            padding-bottom: 100%
            .gallary-img
                width : 100%
</style>
