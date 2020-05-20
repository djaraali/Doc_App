import Vue from 'vue'

export default ({ app: { store, router } }) => {
    Vue.prototype.$wait = store.getters;
}