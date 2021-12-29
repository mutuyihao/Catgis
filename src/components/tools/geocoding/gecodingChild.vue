<template>
  <div>
    <div class="tipsBox">
      <span>地理编码：</span>
      <span class="tips"
        >输入地址规则遵循：国家、省份、城市、区县、城镇、乡村、街道、门牌号码、屋邨、大厦，如：北京市朝阳区阜通东大街6号。</span
      >
      <span class="tips" id="smallTips"
        >（解析方式通过高德开发平台提供的API，网页内工具使用高德公共API，对地址地理编码数量有限制。
        解析结果经纬度坐标系为高德坐标系。）</span
      >
    </div>

    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="value"
      :fetch-suggestions="querySearch"
      placeholder="请输入地址，例如："
      @select="handleSelect"
    >
      <i
        class="el-icon-edit el-input__icon"
        slot="suffix"
        @click="handleIconClick"
      >
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
      <el-button
        slot="append"
        icon="el-icon-check"
        :loading="loadingFinished"
        @click="goToGeoCoding(value)"

        plain
        
        >开始解析</el-button
      >
    </el-autocomplete>
    <div class="tipsBox" id = "showResultBox">
      <span>地理编码结果：</span>
      <el-table :data="tableData" style="width: 98%" max-height="450">
        <el-table-column fixed prop="formatted_address" label="地址">
        </el-table-column>
        <el-table-column prop="location" label="经纬度">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getGeocoding} from '@/network/home.js'

export default {
  name: "geocodingChild",
  components: {},
  props: {},
  data() {
    return {
      loadingFinished: false,
      addrList: [],
      address: "",
      tableData:[],
      value:""
    };
  },
  watch: {},
  computed: {},
  methods: {
    querySearch(queryString, cb) {
      var addrList = this.addrList;
      var results = queryString
        ? addrList.filter(this.createFilter(queryString))
        : addrList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (addr) => {
        return (
          addr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        {
          value: "上海师范大学（奉贤校区）",
          address: "上海市奉贤区海湾路100号",
        },
        {
          value:'上海市南京大饭店',
          address:""
        },
        {
          value:"青岛市验潮站",
          address:""
        },
        {
          value:"北京市紫禁城太和殿",
          address:""
        },{
          value:"陕西省泾阳县永乐镇",
          address:""
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    goToGeoCoding:function(address){
      let resData = []
      let res = getGeocoding(address).then((res)=>{
        resData = res.data.geocodes
        this.tableData = resData
        console.log(this.tableData)
      })
    },
  },
  created() {},
  mounted() {
    this.addrList = this.loadAll();
  },
};
</script>
<style>
#showResultBox{
  margin-top:10%;
}
#smallTips {
  font-size: 10px;
}

.tips {
  font-size: 13px;
  color: #999;
}
.tipsBox {
  width: 98%;
  /* display: flex; */
  margin: 5px auto;
  margin-left: 2%;
}
.addr {
  font-size: 13px;
  color: rgba(122, 115, 115, 0.705);
}
.el-autocomplete {
  width: 85%;
  display: flex;
  margin: 10px auto;
  /* margin-top:50px; */
}
</style>