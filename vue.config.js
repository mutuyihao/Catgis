module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: config => {
        config.externals = {
            'vue-router': 'VueRouter',
            vue: 'Vue',
            vuex: "Vuex",
            axios: 'axios',
            lodash: '_',
            echarts: 'echarts',
            'element-ui': 'ElementUI',
            'mapbox-gl': 'mapboxgl',
            'timeplayer': 'timePlayer'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                // 'src':'@',
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        },
        module: {
            rules: [{
                test: /\.geojson$/,
                loader: 'json-loader'
            }],
        },
    }
}