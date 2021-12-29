import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as echarts from 'echarts'
import "./assets/css/base.css";

document.title = 'CatGIS'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')