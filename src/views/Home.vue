<template>
  <div>
    <div class="home">
      <el-image
        style="width: 100%; height: 100%"
        :src="url"
        :fit="fit" v-if="$store.state.deviceType === 'pc'">
        </el-image>
        <el-image
        style="width: 100%; height: 100%"
        :src="murl"
        :fit="mfit" v-if="$store.state.deviceType === 'mobile'"></el-image>
    </div>
  </div>
</template>

<script>


export default {
  name: "Home",
  components: {
  },
  data() {
    return{
      url:require("@/assets/img/place-chaqia-pcc.jpg"),
      fit:"contain",
      murl:require("@/assets/img/place-chaqia-mc.jpg"),
      mfit:"contain"
    }
  }
};
</script>
<style scoped>
.home{
  width:100%;
}
</style>