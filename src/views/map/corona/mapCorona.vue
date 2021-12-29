<template>
  <div id="map" ref="map">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" class="legendCollapse">
        <template slot="title">
          <span style="">图例</span>
        </template>
        <div class="legend">
          <h4>现存确诊</h4>
          <div><span style="background-color: red"></span>1000</div>
          <div><span style="background-color: #ffd403"></span>150</div>
          <div><span style="background-color: #927903"></span>100</div>
          <div><span style="background-color: #f2f12d"></span>0</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
const MapboxLanguage = require("@mapbox/mapbox-gl-language");
import cityNew from '@/static/cityNew.json'

export default {
  name: "mapCorona",
  components: {},
  props: {},
  data() {
    return {
      activeNames: [],
    };
  },
  watch: {
  },
  computed: {},
  methods: {
    init() {
      mapboxgl.accessToken =
        "";
      var map = new mapboxgl.Map({
        //eslint-disable-line no-unused-vars
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/bright-v9",
        center: [104.61, 34.24],
        maxZoom: 12,
        minZoom: 1,
        zoom: 2.5,
        hash: true,
        maxzoom: 9,
      });
      map.on("load", function () {
        map.addControl(new MapboxLanguage({ defaultLanguage: "zh" }));
        map.addSource("mapData", {
          type: "geojson",
          data: cityNew,
        });
        map.addSource("mapData1", {
          type: "geojson",
          data: cityNew,
          cluster: true,
          clusterRadius: 50,
          clusterProperties: { cCC: ["+", ["get", "cCC"]] },
        });
        map.addLayer({
          id: "coronavirus-heat",
          type: "heatmap",
          source: "mapData",
          maxzoom: 6.9,
          paint: {
            // 热力权重，适用于集合图
            // Mapbox Expression https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "cCC"],
              0,
              0,
              1000,
              1,
            ],
            // 全局控制热力权重
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              3,
              9,
              5,
            ],
            // 热力图配色范围
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0, 0, 0, 0)",
              0.1,
              "#927903",
              0.15,
              "#ffd403",
              1,
              "red",
            ],
            // 每个热力点的绘制半径
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              1,
              4,
              2,
              8,
              3,
              16,
              4,
              32,
              5,
              64,
              6,
              128,
              7,
              256,
              8,
              512,
              9,
              1024,
              10,
              2048,
              11,
              4096,
              17,
              131072,
            ],
            // 热力图的透明度
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5,
              0.95,
              6,
              0.5,
            ],
          },
        });

        map.addLayer({
          id: "clusters-layer",
          type: "circle",
          source: "mapData1",
          minzoom: 6.909,
          filter: [">=", ["get", "cCC"], 1],
          paint: {
            "circle-radius": [
              "step",
              ["get", "cCC"],
              10,
              10,
              20,
              1000,
              30,
              5000,
              40,
            ],
            "circle-color": [
              "step",
              ["get", "cCC"],
              "#9ad5ff",
              10,
              "#9af6ff",
              1000,
              "cyan",
              2000,
              "#f1f075",
            ],
            "circle-translate": [-25, -25],
          },
        });

        map.addLayer({
          id: "clusters-count",
          type: "symbol",
          minzoom: 6.909,
          source: "mapData1",
          filter: [">=", ["get", "cCC"], 1],
          layout: {
            "text-field": "{cCC}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 32,
            "text-allow-overlap": true,
            "text-offset": [-0.8, -0.8],
          },
        });
      });
      this.$store.commit("setMap", map);
    },
  },
  created() {
  },
  mounted() {
    this.init();
    
  },
};
</script>
<style scoped>
.legendCollapse >>> .el-icon-arrow-right.is-active {
  transform: rotate(-90deg);
}
.legendCollapse >>> .el-collapse-item__content {
  padding: 0 !important;
}
.legendCollapse >>> .el-collapse-item__header {
  height: 18px !important;
  margin: 0 auto;
  padding: 2px !important;
  background-color: rgba(191, 191, 191, 0.31) !important;
}
.legendCollapse {
  background-color: #fff;
  border-radius: 3px;
  bottom: 23px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 2px;
  position: absolute;
  right: 20px;
  z-index: 9999;
  width: 68.7px;
  height: 24px;
}
.legend {
  background-color: #fff;
  border-radius: 3px;
  bottom: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 10px;
  position: absolute;
  z-index: 100;
}
.legend h4 {
  margin: 0 0 10px;
}
.legend div span {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}
#map {
  /* position: fixed; */
  z-index: 10;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  width: 99%;
  height: 45.5rem;
}
@media screen and (max-width: 800px) {
  #map {
    width: 100%;
    height: 300px;
    overflow: scroll;
  }
}
</style>