<template>
  <div>
    <div id="background">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新冠疫情地图</span>
        </div>
        <button @click = "showGuide" style="color:grey;font-size:12px" >地图说明 / <span>ver1.0.2</span></button>
      </el-card>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item id="elCollapse" title="每日疫情数据合计" name="1">
        <div id="background">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>现存确诊数</span>
            </div>
            <div class="text item">
              {{ $store.state.corona.sumCurrentConfirmed }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>累计治愈数</span>
            </div>
            <div class="text item">
              {{ $store.state.corona.sumCured }}
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>累计死亡数</span>
            </div>
            <div class="text item">
              {{ $store.state.corona.sumDead }}
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
        this.$alert('<strong><i>1.数据介绍：</i>新冠疫情统计数据日期截止于2020年7月4日</strong>'+
        '<br><strong><i>2.功能介绍：</i><br>2.1地图为目前确诊数的热力图+聚类统计图(放大地图到一定等级才会展现)<br>2.2'
        +'点击详情表中任一数据行，地图可自动跳转到该地区</strong>', '地图说明',
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
  width:100%;
  margin:0 auto;
}
.text {
  font-size: 18px;
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
  font-size:20px;
  width: 100%;
}
.box-card >>> .el-card__header{
  padding:9px 10.8px !important;
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
@media screen and (max-width: 1080px) {
.box-card >>> .el-card__header{
  padding:2px 2px !important;
}
}
</style>