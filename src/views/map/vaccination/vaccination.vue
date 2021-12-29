<template>
  <div id="map" ref="map">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" class="legendCollapse">
        <template slot="title">
          <span style="">图例</span>
        </template>
        <div class="legend">
          <h4>累计接种疫苗人数占人口百分比</h4>
          <div><span style="background-color: #08306b"></span>60%</div>
          <div><span style="background-color: #08519c"></span>50%</div>
          <div><span style="background-color: #2171b5"></span>40%</div>
          <div><span style="background-color: #4292c6"></span>30%</div>
          <div><span style="background-color: #6baed6"></span>20%</div>
          <div><span style="background-color: #9ecae1"></span>10%</div>
          <div><span style="background-color: #c6dbef"></span>5%</div>
          <div><span style="background-color: #deebf7"></span>1%</div>
          <div><span style="background-color: #f7fbff"></span>数据缺失</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
const MapboxLanguage = require("@mapbox/mapbox-gl-language");

export default {
  name: "mapVaccination",
  components: {},
  props: {},
  data() {
    return {
      activeNames: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    init() {
      let mapData = this.$store.getters.getVaccinationData.mapData;
      let jsonData = JSON.parse(JSON.stringify(mapData));
      mapboxgl.accessToken =
        "";
      var map = new mapboxgl.Map({
        //eslint-disable-line no-unused-vars
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/bright-v9",
        center: [105.3, 33.4],
        maxZoom: 12,
        minZoom: 1,
        zoom: 1,
        hash: true,
        maxzoom: 9,
      });
      map.on("load", function () {
        map.addControl(new MapboxLanguage({ defaultLanguage: "zh" }));
        map.addSource("vaccination", {
          type: "geojson",
          data: jsonData,
        });
        map.addLayer({
          id: "fill",
          type: "fill" /* fill类型一般用来表示一个面，一般较大 */,
          source: "vaccination",
          paint: {
            "fill-color": {
              property: "percent", // this will be your density property from you geojson
              stops: [
                [0, "#f7fbff"],
                [0.01, "#deebf7"],
                [0.05, "#c6dbef"],
                [0.1, "#9ecae1"],
                [0.2, "#6baed6"],
                [0.3, "#4292c6"],
                [0.4, "#2171b5"],
                [0.5, "#08519c"],
                [0.6, "#08306b"],
                [9, "#f7fbff"],
              ],
            },
            "fill-opacity": 1 /* 透明度 */,
          },
        },'country_label_4');

        map.addLayer({
          id: "area-outline",
          source: "vaccination",
          type: "line",
          paint: {
            "line-color": "rgba(213,213,213,0.8)",
          },
        },'country_label_4');
      });
      
      this.$store.commit("setMap", map);
      map.on("click", "fill", function (e) {
        
          new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.FCNAME + "<br>" + "累计接种疫苗人数" + e.features[0].properties.pV + "人" + "<br>" + "累计接种疫苗剂次" + e.features[0].properties.tV + "剂次" + "<br>" + "每日新接种疫苗剂次" + e.features[0].properties.dV + "剂次")
          .addTo(map);
        // }
        
      });

    },
  },
  created() {},
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