<template>
  <div class="aaa">index</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
export default{
  setup() {
    const route = useRoute()
    route.meta.title = 11
    console.log(import.meta.env.SSR)
  }
}
</script>


<style lang="scss" scoped>
.aaa{
  color: $base_color;
}
</style>