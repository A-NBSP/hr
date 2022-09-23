<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon iconClass="eye-open"></svg-icon>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {
  name: 'Dashboard',
  components: { SvgIcon },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
