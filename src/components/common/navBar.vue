<template>
  <div>
    <div
      id="navBar"
      class="header-inner"
      v-if="$store.state.deviceType === 'pc'"
    >
      <el-row :gutter="4" class="el-row">
        <el-col id="left-col" :xs="4" :sm="3" :md="3" :lg="3">
          <router-link to="/"
            ><img id="logo" src="@/assets/logo.png" alt="logo"
          /></router-link>
        </el-col>
        <el-col id="middle-col" :xs="11" :sm="18" :md="18" :lg="18">
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/atlas">地图集</el-menu-item>
            <el-menu-item index="/tools">工具</el-menu-item>
            <el-menu-item index="/guide">用户指南</el-menu-item>
            <el-menu-item index="/help">帮助</el-menu-item>
          </el-menu>
        </el-col>
        <el-col id="right-col" :xs="4" :sm="3" :md="3" :lg="3"
          ><a
            href="https://github.com/mutuyi/Catgis"
            target="_blank"
            rel="noopener noreferrer"
            ><img
              id="githubPNG"
              src="@/assets/img/github.png"
              alt="跳转到我的Github" /></a
        ></el-col>
      </el-row>
    </div>
    <div
      id="mobleNavBar"
      class="header-inner"
      v-if="$store.state.deviceType === 'mobile'"
    >
      <el-row :gutter="4" class="el-row">
        <el-col id="m-LeftCol" :xs="4" :sm="3" :md="3">
          <a
            href="https://github.com/mutuyi/Catgis"
            target="_blank"
            rel="noopener noreferrer"
            ><img
              id="mobileGithubPNG"
              src="@/assets/img/github.png"
              alt="跳转到我的Github"
          /></a>
        </el-col>
        <el-col id="middle-col" :xs="15" :sm="17" :md="17">
          <router-link to="/"
            ><img id="logo" src="@/assets/logo.png" alt="logo"
          /></router-link>
        </el-col>
        <el-col id="m-RightCol" class="m-RightCol" :xs="5" :sm="4" :md="4">
          <el-menu
            mode="horizontal"
            @select="handleSelect"
            :unique-opened="true"
            :router="true"
            :collapse-transition="true"
            v-model="isXLogo"
            menu-trigger="click"
          >
            <el-submenu index="1" id="m-menu">
              <template slot="title">
                <img
                  src="@/assets/img/menu.png"
                  class="el-icon-menu"
                  @click="changePng"
              /></template>
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/atlas">地图集</el-menu-item>
              <el-menu-item index="/tools">工具</el-menu-item>
              <el-menu-item index="/guide">用户指南</el-menu-item>
              <el-menu-item index="/help">帮助</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      isXLogo: false,
      deviceType: this.$store.state.deviceType,
    };
  },
  methods: {
    // 判断移动端，在点击菜单内导航后，更换菜单图片回menu图片，并让isXLogo取反值
    handleSelect() {
      if (this.deviceType == "mobile") {
        let menuLogo = document.getElementsByClassName("el-icon-menu")[0];
        menuLogo.src = require("@/assets/img/menu.png");
        this.isXLogo = !this.isXLogo;
      }
    },
    // 判断移动端，用户没有点击菜单内导航，只是点击了菜单，根据isXLogo的值，更换菜单图片
    changePng() {
      if (this.deviceType == "mobile") {
        let menuLogo = document.getElementsByClassName("el-icon-menu")[0];
        let menuDom = document.getElementsByClassName("el-menu--popup")[0];
        if (!this.isXLogo) {
          menuLogo.src = require("@/assets/img/x.png");
          menuDom.style.display = "block";
          this.isXLogo = !this.isXLogo;
        } else {
          menuLogo.src = require("@/assets/img/menu.png");
          menuDom.style.display = "none";
          this.isXLogo = !this.isXLogo;
        }
      }
    },
  },
};
</script>
<style scss>
.el-menu--horizontal > .el-submenu {
  float: right;
  margin-right: 5px;
}
.el-menu--horizontal .el-submenu.is-active .el-submenu__title {
  border-bottom: 0px !important;
}
</style>
<style scoped>
.m-RightCol /deep/ .el-menu {
  border-bottom: 0px;
  margin: 0, auto;
  padding: 0;
}
.m-RightCol /deep/.el-icon-arrow-down:before {
  content: none;
}
.el-menu /deep/ .el-icon-menu {
  font-size: 35px;
  margin: 0 auto;
  margin-left: 14px;
}
.el-menu /deep/ .el-submenu {
  font-size: 35px;
  margin: 0, auto;
  padding: 0;
}

.el-menu /deep/.el-submenu__title {
  padding: 0;
}
#mobileGithubPNG {
  width: 35px;
  height: 35px;
  margin-top: 14px;
  margin-left: 14px;
}
#m-LeftCol {
  margin: 0 auto;
  height: 60px;
}
#m-RightCol {
  height: 60px;
  overflow: hidden;
}
#mobileNavBar {
  position: relative;
  min-width: 100%;
  margin: 0px auto;
  padding-left: 16px;
  padding-right: 30px;
  line-height: 16px;
}
#githubPNG {
  width: 35px;
  height: 35px;
  margin-top: 15px;
  float: right;
}
#navBar {
  position: relative;
  min-width: 1000px;
  max-width: 1156px;
  margin: 0px auto;
  padding-left: 16px;
  padding-right: 30px;
}
#middle-col {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
#right-col {
  line-height: 60px;
  overflow: hidden;
}
#logo {
  width: 162.8px;
  height: 60px;
  margin-top: 0px;
}
a {
  text-decoration: none;
}
</style>