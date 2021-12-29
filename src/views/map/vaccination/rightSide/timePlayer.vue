<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item id="elCollapse" title="时间选择器" name="1">
        <div id="timeplayer"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import timePlayer from "timeplayer";

export default {
  name: "timePlayer",
  components: {},
  props: {},
  data() {
    return {
      activeNames: ["1"],
    };
  },
  watch: {},
  computed: {},
  methods: {
    init() {
      const timePlayerDom = document.getElementById("timeplayer");
      const dates = this.$store.getters.getVaccinationDateList
      const tp = new timePlayer(timePlayerDom, {
        dates,
        postSpace: 15,
      });
      tp.on("change", (index, value) => {
        if (!value) {
          value = dates[dates.length-1];
        }
        this.$store.dispatch("setNewVaccinationDate", value);
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
.el-collapse >>> .el-collapse-item__header{
  background-color: rgba(191, 191, 191, 0.31)!important;
  height:30px !important;
}
.el-collapse >>> .el-collapse-item__content {
  padding: 0 !important;
}
#timeplayer {
  /* align-items: center; 垂直居中 */
  /* justify-content: center; */
  /* padding:0 auto; */
  margin: 0 auto;
  width: 100%;
  min-width:320px;
}

</style>