<template>
  <div id="rightSide">
    <time-player></time-player>
    <side-table></side-table>  
  </div>
</template>

<script>
const sideTable =()=>import('./sideTable')
const timePlayer =()=>import('./timePlayer')

export default {
  name:'rightSide',
  components: {
    sideTable,
    timePlayer
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
<style scoped>
#rightSide{
  width:100%;
}
</style>