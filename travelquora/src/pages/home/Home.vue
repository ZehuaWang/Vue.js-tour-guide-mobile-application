<template>
    <div>
    <home-header :city="city"></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons  :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
    </div>
</template>

<script>
    import HomeHeader from './components/Header'
    import HomeSwiper from './components/Swiper'
    import HomeIcons  from './components/Icons'
    import HomeRecommend from './components/Recommend'
    import HomeWeekend from './components/Weekend'
    import axios from 'axios'
    export default {
        name: 'Home',
        components: {
            HomeHeader: HomeHeader,
            HomeSwiper: HomeSwiper,
            HomeIcons: HomeIcons,
            HomeRecommend: HomeRecommend,
            HomeWeekend: HomeWeekend
        },
        data () {
            return {
                city: '',
                swiperList: [],
                iconList: [],
                recommendList: [],
                weekendList: []
            }
        },
        methods: {
            getHomeInfo() {
                axios.get('/api/index.json').then(this.getHomeInfoSucc); //在index.js中配置请求转发
            },
            getHomeInfoSucc(res) {console.log(res);
                res = res.data;
                if(res.ret && res.data) {
                    const data = res.data;
                    this.city = data.city;
                    this.swiperList = data.swiperList;
                    this.iconList = data.iconList;
                    this.recommendList = data.recommendList;
                    this.weekendList = data.weekendList;
                }
            }
        },
        mounted () {
            this.getHomeInfo();
        }

    }

</script>

<style></style>