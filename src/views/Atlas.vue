<template>
  <div class="atlas">
    <item-box></item-box>
  </div>
</template>

<script>
const itemBox =()=>import( 'components/atlas/itemBox.vue')

export default {
  name: "atlas",
  components:{
    itemBox,
  }
};
</script>
<style>

</style>