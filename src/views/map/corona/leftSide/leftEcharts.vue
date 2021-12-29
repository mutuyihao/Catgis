<template>
  <div>
    <el-collapse v-model="activeNames">
  <el-collapse-item title="国内新冠疫情数据图表" name="1">
    <div id="echartsBox">
      <div id="chinaEcharts"></div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="海外六国新冠疫情图表" name="2">
    <div id="echartsBox">
      <div id="foreignEcharts"></div>
    </div>
  </el-collapse-item>
</el-collapse>

  </div>
</template>

<script>
import {
  chinaChartsOption,
  foreignChartsOption,
  romaTheme,
} from "./echartsOption.js";

export default {
  name: "leftEcharts",
  components: {},
  props: {},
  data() {
    return {
      activeNames:['1','2']
    };
  },
  watch: {},
  computed: {},
  methods: {
    drawEcharts() {
      this.$echarts.registerTheme("roma", romaTheme);
      var ChinaDataChart = this.$echarts.init(
        document.getElementById("chinaEcharts"),
        "roma"
      );
      ChinaDataChart.setOption(chinaChartsOption);
      window.addEventListener("resize", () => {
        ChinaDataChart.resize();
      });
      var foreignDataChart = this.$echarts.init(
        document.getElementById("foreignEcharts"),
        "roma"
      );
      foreignDataChart.setOption(foreignChartsOption);
      window.addEventListener("resize", () => {
        foreignDataChart.resize();
      });
    },
  },
  created() {},
  mounted() {
    this.drawEcharts();
  },
};
</script>
<style scoped>
#echartsBox {
  margin-top: 1.3%;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}
#chinaEcharts {
  height: 14.9rem;
  border-radius: 5px;
  border: 1px solid #7a7e84;
  width: 100%;
  /* transform:scale(0.9,0.9); */
}
#foreignEcharts {
  height: 14.9rem;
  border-radius: 5px;
  border: 1px solid #7a7e84;
  width: 100%;
  /* transform:scale(0.9,0.9); */
}
.el-collapse >>> .el-collapse-item__header{
  background-color: rgba(191, 191, 191, 0.31)!important;
  height:30px !important;
}
.el-collapse >>> .el-collapse-item__content {
  padding: 1px !important;
}
</style>