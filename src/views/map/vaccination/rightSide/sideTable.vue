<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item id="elCollapse" title="疫情数据详情表" name="1">
        <el-input
          v-model="search"
          placeholder="请输入国家名或者ISO-CODE：例如中国,CHN。"
        ></el-input>
        <div id="buttonBC">
          <el-button type="primary" @click="setDataFilter" size="mini" >筛选</el-button>
          <el-button type="primary" @click="clearDataFilter" size="mini" >清楚筛选</el-button
          >
        </div>

        <el-table
          :data="tableList"
          style="width: 100%"
          max-height="699"
          :fit="true"
          @row-click="getClick"
          id="m-el-table"
          :default-sort="{ prop: 'pV', order: 'descending' }"
        >
          <el-table-column prop="FCNAME" label="地区" width="65" sortable>
          </el-table-column>
          <el-table-column prop="pop_all" label="人口(万)" width="69" sortable>
          </el-table-column>
          <el-table-column prop="pV" label="累计接种疫苗数(人)" width="69" sortable>
          </el-table-column>
          <el-table-column prop="tV" label="累计接种疫苗数(剂次)" width="69" sortable>
          </el-table-column>
          <el-table-column prop="tB" label="累计接种加强针(剂次)" width="69" sortable>
          </el-table-column>
          <el-table-column prop="dV" label="每日接种疫苗数(剂次)" width="69" sortable>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import nationRegion from "@/static/nationRegion.json";

export default {
  name: "sideTable",
  components: {},
  props: {},
  data() {
    return {
      activeNames: ["1"],
      search: "",
      tableList: this.$store.state.vaccinationData.tableList,
    };
  },
  computed: {},
  watch: {
    "$store.state.vaccinationData.tableList": function () {
      this.tableList = this.$store.getters.getVaccinationData.tableList;
    },
  },
  computed: {},
  methods: {
    getClick(row) {
      var FCNAME = row["FCNAME"];
      let resArray = [];
      for (let ele of nationRegion.features) {
        if (FCNAME == ele.properties.FCNAME) {
          resArray.push(ele.properties.centerX, ele.properties.centerY);
          continue;
        }
      }
      let Map = this.$store.getters.getMap;
      Map.zoomTo("2.5", { center: [resArray[0] - 3, resArray[1] - 10] });
    },
    setDataFilter() {
      this.tableList = this.$store.getters.getVaccinationData.tableList
      let filterList = [];
      if (this.search == "") {
        this.$message("您忘记输入内容了！");
      } else {
        for (let ele of this.tableList) {
          if (ele.SOC.search(this.search) !=-1 || ele.FCNAME.search(this.search)!=-1) {
            filterList.push(ele);
          }
        }
        this.tableList = filterList;
      }
    },
    clearDataFilter() {
      this.search = "";
      this.tableList = this.$store.getters.getVaccinationData.tableList;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
#buttonBC{
  margin:3px auto;
}
#m-el-table{
  font-size:13px;
}
.el-collapse >>> .el-collapse-item__header {
  background-color: rgba(191, 191, 191, 0.31) !important;
  height: 30px !important;
}
.el-collapse >>> .el-collapse-item__content {
  padding: 1px !important;
}
@media screen and (max-width: 1080px) {
  #m-el-table {
    max-height: 500px !important;
  }
}
</style>