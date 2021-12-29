import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import carousel from '@/components/common/carousel.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        components: {
            headerSwiper: carousel,
            default: Home,
        },
    },
    {
        path: '/atlas',
        component: function() {
            return import ('../views/Atlas.vue')
        },
    },
    {
        path: '/atlas/mapCorona',
        components: {
            leftSide: () => { return import ('@/views/map/corona/leftSide/leftSide.vue') },
            default: () => { return import ('../views/map/corona/mapCorona.vue') },
            rightSide: () => { return import ('@/views/map/corona/rightSide/rightSide.vue') },
        }
    },
    {
        path: '/atlas/mapVaccination',
        components: {
            leftSide: () => { return import ('@/views/map/vaccination/leftSide/leftSide.vue') },
            default: () => { return import ('../views/map/vaccination/vaccination.vue') },
            rightSide: () => { return import ('@/views/map/vaccination/rightSide/rightSide.vue') },
        }
    },
    {
        path: '/tools',
        component: () =>
            import ('../views/Tools.vue')
    },
    {
        path: '/tools/geocoding',
        component: () =>
            import ('components/tools/geocoding/geocoding.vue')
    },
    {
        path: '/guide',
        component: () =>
            import ('../views/Guide.vue')
    },
    {
        path: '/help',
        component: () =>
            import ('../views/Help.vue')
    },
]
const router = new VueRouter({
    mode: "history",
    routes
})

export default router