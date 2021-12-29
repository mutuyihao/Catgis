<template>
  <div>
    <el-row id="elRowTools">
      <el-col
        :span="8"
        v-for="(o, index) in 1"
        :key="o"
        :offset="index > 0 ? 1 : 0"
        id="elColTools"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover" id="elCardTools">
          <router-link to="/tools/geocoding"><img src="@/assets/img/geocodingpic.png" class="image" />
          <div style="padding: 14px">
            <span>地理编码</span>
            <div class="bottom clearfix">
              <time class="time">{{ updateDate }}</time>
            </div>
          </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'itemToolsBox',
  data() {
    return {
      updateDate: "更新时间为2021.04.24",
    };
  },
};
</script>
<style>
router-link-active {
  text-decoration: none;
  color: black;
}
a{
  text-decoration: none;
  color: black;
}
img {
  position: relative;
  width: 80%;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100px;
  height:80px;
  display: block;
  margin:0 auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
#elCardTools{
  width:100%;
}
#elColTools{
  width:170px;
}
#elRowTools{
  left:2%;
  width:100%;
}
</style>