<template>
  <div id="app">
    <el-container v-if="$store.state.deviceType === 'pc'">
      <el-header id="stickyHeader">
        <nav-bar></nav-bar>
      </el-header>
      <el-container>
        <el-header id="header-swiper" height="100%"
          ><router-view name="headerSwiper"
        /></el-header>
        <div id="app-main">
          <div id="content-aside">
            <router-view name="leftSide"></router-view>
          </div>
          <div id="content-main">
            <router-view />
          </div>
          <div id="content-aside">
            <router-view name="rightSide"></router-view>
          </div>
        </div>
      </el-container>
    </el-container>
    <el-container v-if="$store.state.deviceType === 'mobile'">
      <el-header id="mobileHeader">
        <nav-bar></nav-bar>
      </el-header>
      <el-container>
        <el-header id="header-swiper" height="100%"
          ><router-view name="headerSwiper"
        /></el-header>
        <div id="m-app-main">
          <div id="m-content-main">
            <div class="m-side">
              <router-view name="leftSide"></router-view>
            </div>
            <router-view />
            <div class="m-side">
              <router-view name="rightSide"></router-view>
            </div>
            <el-backtop></el-backtop>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import navBar from "components/common/navBar.vue";

export default {
  components: {
    navBar,
  },
  data() {
    return {};
  },
  methods: {
    //判别用户设备
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    if (this._isMobile()) {
      let deviceType = "mobile";
      this.$store.dispatch("setDeviceType", deviceType);
    } else {
      let deviceType = "pc";
      this.$store.dispatch("setDeviceType", deviceType);
    }
  },
};
</script>
<style>
.el-message-box {
  width: 66.7% !important;
}
</style>
<style scoped>
#header-swiper {
  padding: 0;
}
.m-side {
  text-align: center;
}
#m-content-main {
  display: inline;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
#m-app-main {
  position: relative;
  margin: 10px auto;
  width: 100%;
  display: flex;
  overflow: hidden;
}
#mobileHeader {
  background-clip: content-box;
  min-width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  padding: 0px;
}
#sideTable {
  margin-top: 40px;
}
#tpBox {
  width: 100%;
  height: 3%;
}

#stickyHeader {
  background-clip: content-box;
  min-width: 1000px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  padding: 0px;
}
#app-main {
  position: relative;
  margin: 10px auto;
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100%;
}
#content-aside {
  text-align: center;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);
  width: 22%;
  height: 100%;
  overflow: hidden;
}
#content-main {
  display: inline;
  width: 56%;
  margin: 0 auto;
  height: 970px;
  overflow: hidden;
  height: 100%;
}
</style>
