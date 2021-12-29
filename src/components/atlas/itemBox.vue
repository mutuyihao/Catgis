<template>
  <div>
    <el-row id="elRow" v-if="$store.state.deviceType === 'pc'">
      <el-col
        :span="7"
        v-for="(ele, index) in cardList"
        :key="index"
        :offset="index > 0 ? 1 : 0"
        id="elCol"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="el-Card">
          <router-link :to="ele.link"
            ><img :src="ele.src" class="image"/>
            <div style="padding: 14px">
              <span class="cardName">{{ ele.name }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ ele.histories }}</time>
              </div>
            </div>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="elRow" v-if="$store.state.deviceType === 'mobile'">
      <el-col
        :span="11"
        v-for="(o, index) in cardList"
        :key="index"
        :offset="index > 0 ? 0 : 0"
        class="m-elCol"
      >
        <el-card :body-style="{ padding: '5px' }" shadow="hover" class="m-el-Card">
          <router-link :to="o.link"
            ><img :src="o.src" class="m-image" />
            <div style="padding: 3px">
              <span class="mcardName">{{ o.name }}</span>
              <div class="bottom clearfix">
                <time class="mtime">{{ o.histories }}</time>
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
  name: "itemBox",
  data() {
    return {
      cardList: [
        {
          name: "国内新冠疫情地图",
          link: "/atlas/mapCorona",
          src: require("@/assets/img/domestic-1.jpg"),
          histories: "上次地图更新时间为2021.12.28",
        },
        {
          name: "新冠疫苗专题地图",
          link: "/atlas/mapVaccination",
          src: require("@/assets/img/vaccination-1.jpg"),
          histories: "上次地图更新时间为2021.12.29",
        },
        {
          name: "其它专题地图",
          link: "",
          src: require("@/assets/img/place.jpg"),
          histories: "(预估中)",
        },
      ],
      hdgd:"300px"
    };
  },
  methods: {
    // 随浏览器窗口变化，调整地图集卡片盒子大小
    adjustHeight() {
      let elCardList = document.getElementsByClassName("el-Card")
      for(let ele of elCardList){
            ele.style.height="245px"
          }
      window.onresize = function windowResize() {
        let w = window.innerWidth*0.56;
        let h = 300;
        if (w > 717) {
          h = 235;
        } else {
          h = 0.5 * w/3;
        }
        let hdgd = h + 'px'
          for(let ele of elCardList){
            ele.style.height=hdgd
          }
      };
    },
  },
  mounted() {
    this.adjustHeight();
  },
};
</script>
<style scoped>
.mcardName{
  font-size:1rem;
}
.mtime{
  font-size: 0.6rem;
  color: #999;
}
.cardName{
  font-size:18px;
}
.m-elCol{
  margin-left:5px;
  margin-bottom:5px;
  height:100%;
}
.m-image{
  position: relative;
  width: 161px;
  min-width: 161px;
  min-height: 130px;
  display: block;
  margin:0 auto;
}
router-link-active {
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
  color: black;
}
.image {
  position: relative;
  width: 373px;
  min-width: 230px;
  min-height: 130px;
  height:165px;
  display: block;
  width:100%;
  object-fit: fill;
}
.time {
  font-size: 8px;
  color: #999;
}
.bottom {
  margin-top: 5.4px;
  line-height: 12px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.elCard {
  height: 235px;
}
#elCol {
  height: 100%;

}
#elRow {
  left: 2%;
}
</style>