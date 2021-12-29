<template>
  <div>
    <div id="background">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新冠疫苗专题地图</span>
        </div>
        <button @click = "showGuide" style="color:grey;font-size:12px" >地图说明 / <span>ver1.0.1</span></button>
      </el-card>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item id="elCollapse" title="全球每日新冠疫苗接种数据" name="1">
        <div id="background">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>每日接种数(剂次)</span>
            </div>
            <div class="text item">
              {{ $store.state.vaccinationData.worldDV }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>累计接种数(剂次)</span>
            </div>
            <div class="text item">
              {{ $store.state.vaccinationData.worldTV }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>累计接种数(个人)</span>
            </div>
            <div class="text item">
              {{ $store.state.vaccinationData.worldPV }}
            </div>
          </el-card>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "leftDataPanel",
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
    showGuide(){
        this.$alert('<strong><i>1.数据介绍：</i>新冠疫情疫苗接种数据日期截止于2021年5月29日</strong>'+
        '<br><strong><i>2.功能介绍：</i><br>2.1点击时间选择器播放按钮，浏览疫苗历史接种数据<br>2.2'
        +'点击详情表中任一数据行，地图可自动跳转到该地区<br>2.3点击地图上多边形会弹出国名及数据<br>2.4地图内显示为累计接种疫苗人数占该国人口百分比</strong>', '地图说明',
        {
          dangerouslyUseHTMLString: true,confirmButtonText: '确定',})
    }
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
#background {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
  width:100%
}
.text {
  font-size: 13px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  font-size:17px;
  width: 100%;
}
.box-card >>> .el-card__header{
  padding:6px 7.8px !important;
}
.box-card >>> .el-card__body{
  padding:10px !important;
}
.el-collapse >>> .el-collapse-item__header{
  
  background-color: rgba(191, 191, 191, 0.31)!important;
  height:30px !important;
}
.el-collapse >>> .el-collapse-item__content {
  padding: 1px !important;
}

</style>