<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item id="elCollapse" title="疫情数据详情表" name="1">
        <el-input
          v-model="search"
          placeholder="请输入省名或市名，例如:北京市,湖北省"
        ></el-input>
        <div id="buttonBC">
          <el-button type="primary" @click="setDataFilter" size="mini" >筛选</el-button>
          <el-button type="primary" @click="clearDataFilter" size="mini" >清除筛选</el-button
          >
        </div>
        <el-table
          :data="tableList"
          style="width: 100%"
          max-height="699px"
          :fit="true"
          @row-click="getClick"
          id="m-el-table"
        >
          <el-table-column prop="pN" label="地区" width="72" sortable>
          </el-table-column>
          <el-table-column prop="cN" label="来源" width="72" sortable> </el-table-column>
          <el-table-column prop="cCC" label="现存确诊" sortable> </el-table-column>
          <el-table-column prop="cuC" label="累计治愈" width="72" sortable>
          </el-table-column>
          <el-table-column prop="dC" label="累计死亡" width="72" sortable>
          </el-table-column>
          <el-table-column prop="coC" label="累计确诊" width="72" sortable>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getGeocoding } from "@/network/home.js";
export default {
  name: "sideTable",
  components: {},
  props: {},
  data() {
    return {
      activeNames: ["1"],
      "tableList":this.$store.state.corona.tableList,
      search:""
    };
  },
  watch: {
    "$store.state.corona.tableList": function () {
      this.tableList = this.$store.getters.getCorona.tableList;
    },
  },
  computed: {},
  methods: {
    getClick(row) {
      var address = "";
      if (
        row["cN"] == "未公布来源" ||
        row["cN"] == "境外输入" ||
        row["cN"] == "外地来京" ||
        row["cN"] == "外地来沪" ||
        row["cN"] == "境外来沪"
      ) {
        address = row["pN"];
      } else {
        address = row["pN"] + row["cN"];
      }
      console.log(address);
      var resData = [];
      let rQ = getGeocoding(address).then((res) => {
        resData = res.data.geocodes[0].location;
        let resArray = resData.split(",");
        let Map = this.$store.getters.getMap;
        console.log(resArray)
        Map.zoomTo("8.82", { center: resArray });
      });
    },
    setDataFilter() {
      this.tableList = this.$store.getters.getCorona.tableList
      let filterList = [];
      if (this.search == "") {
        this.$message("您忘记输入内容了！");
      } else {
        for (let ele of this.tableList) {
          if (ele.pN.search(this.search) !=-1 || ele.cN.search(this.search)!=-1) {
            filterList.push(ele);
          }
        }
        this.tableList = filterList;
      }
    },
    clearDataFilter() {
      this.search = "";
      this.tableList = this.$store.getters.getCorona.tableList;
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
.el-collapse >>> .el-collapse-item__header{
  background-color: rgba(191, 191, 191, 0.31)!important;
  height:30px !important;
}
.el-collapse >>> .el-collapse-item__content {
  padding: 1px !important;
}
@media screen and (max-width: 800px) {
  #m-el-table {
    max-height: 500px !important;
  }
}
</style>