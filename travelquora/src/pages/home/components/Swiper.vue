<template>
    <div class="wrapper">
        <swiper :options="swiperOption" v-if="showSwiper">
        <!-- slides -->
        <swiper-slide v-for="item of list" :key="item.id">
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
        props: {
            list: Array
        },
        data () {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true
                }
            }
        },
        computed: {
            showSwiper () {
                return this.list.length
            }
        }
    }
</script>

<style lang="stylus" scoped>
    
    .wrapper >>> .swiper-pagination-bullet-active
        background: #fff !important
    
    .wrapper >>> .swiper-pagination
        padding-bottom: 0.3rem !important 

    .wrapper
        overflow: hidden
        width: 100%
        height: 0
        padding-bottom: 26.668%
        background: #eee
        .swiper-img
            width: 100%
            
</style>