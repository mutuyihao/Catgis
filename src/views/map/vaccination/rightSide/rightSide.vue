<template>
  <div>
    <time-player></time-player>
    <side-table></side-table>  
  </div>
</template>

<script>
const sideTable =()=>import('./sideTable') 
const timePlayer =()=>import('./timePlayer') 

export default {
  name:'vaccinationRightSide',
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
<style>
</style>