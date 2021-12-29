<template>
  <div>
    <left-data-panel></left-data-panel>
    <left-echarts></left-echarts>
  </div>
</template>

<script>
const leftDataPanel =()=>import('./leftDataPanel.vue')
import leftEcharts from './leftEcharts.vue'

export default {
  name:'leftSide',
  components: {
    leftDataPanel,
    leftEcharts
  },
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
</style>