import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)
export default new Vuex.Store({
    state: state,
    actions: {
        changeCity(ctx, city) {
            ctx.commit('changeCity', city);
        }
    },
    mutations: {
        changeCity(state, city) {
            state.city = city;
            try {
                localStorage.city = city
            } catch (e) {

            }
        }
    }
})