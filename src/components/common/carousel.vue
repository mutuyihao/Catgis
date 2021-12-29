<template>
  <div>
    <el-carousel
      v-if="$store.state.deviceType === 'pc'"
      :interval="3000"
      :height="swiperHeight + 'px'"
    >
      <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
        <div align="center">
          <router-link :to="item.path">
            <el-image :src="item.url" :fit="fit"></el-image>
          </router-link>
          <h3 class="carouselTitle">{{ item.name }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-carousel v-if="$store.state.deviceType === 'mobile'" :interval="3000" :height="swiperHeight + 'px'">
      <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
        <div align="center">
          <router-link :to="item.path">
            <el-image :src="item.url" :fit="fit"></el-image>
          </router-link>
          <h3 class="carouselTitle">{{ item.name }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "carousel",
  components: {},
  data() {
    return {
      imgUrl: [
        {
          url: require("@/assets/img/domestic-0.jpg"),
          name: "国内新冠疫情地图",
          path: "/atlas",
        },
        {
          url: require("@/assets/img/vaccination-0.jpg"),
          name: "全球新冠疫苗地图",
          path: "/atlas",
        },
        {
          url: require("@/assets/img/tool-0.jpg"),
          name: "地理编码工具",
          path: "/tools",
        },
        {
          url: require("@/assets/img/place-0.jpg"),
          name: "祁连山脉雪山",
          path: "",
        },
      ],
      fit: "contain",
      swiperHeight: 350,
      deviceType: this.$store.state.deviceType,
    };
  },
  methods: {
    // 该函数为根据浏览器窗口宽度，设置走马灯组件初始宽度
    setSize: function () {
      this.swiperHeight = (window.innerWidth * 0.56) / 3.1933;
      let title = document.getElementsByClassName("carouselTitle");
      for (let element of title) {
        element.style.fontSize = this.swiperHeight / 11.667 + "px";
      }
    },
    //移动端函数，功能同上 
    mobileSetSize: function () {
      this.swiperHeight = window.innerWidth / 3.1933;
      let title = document.getElementsByClassName("carouselTitle");
      for (let element of title) {
        element.style.fontSize = this.swiperHeight / 7.667 + "px";
      }
    },
  },
  mounted() {
    if (this.deviceType == "pc") {
      // 根据浏览器窗口宽度，设置走马灯组件初始宽度
      this.setSize();
      // 根据浏览器窗口宽度变化，设置走马灯组件宽度
      window.onresize = () => {
        this.setSize();
      };
    } else {
      this.mobileSetSize();
    }
  },
};
</script>
<style scoped>
#titleBox {
  background: grey;
}
.el-image {
  /* height:19.5rem; */
  width: 100%;
  height: inherit;
}
.el-carousel {
  overflow: hidden;
  margin: 0 auto;
  width: 56%;
  margin-top: 0.5%;
}
.el-carousel__container {
  height: 100% !important;
}
.carouselTitle {
  width: 100%;
  color: #070707c5;
  font-size: 30px;
  opacity: 0.75;
  line-height: 2.5rem;
  position: absolute;
  text-align: center;
  height: 3rem;
  background-color: rgba(170, 169, 169, 0.452);
  margin: 0 auto;
  bottom: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: argb(0.1, 0.1, 0.1, 0.1);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: argb(0.1, 0.1, 0.1, 0.1);
}
@media screen and (max-width: 1280px) {
  .carouselTitle {
    width: 100%;
    color: #070707c5;
    font-size: 2rem;
    opacity: 0.75;
    line-height: 2.5em;
    position: absolute;
    text-align: center;
    height: 3em;
    background-color: rgba(170, 169, 169, 0.452);
    margin: 0 auto;
    bottom: 0;
  }
  .el-carousel {
    width: 100%;
    margin-top: 0.5%;
    overflow: hidden;
    margin: 0 auto;
  }
  .el-image {
    /* height:19.5rem; */
    width: 100%;
    height: inherit;
  }
}
</style>