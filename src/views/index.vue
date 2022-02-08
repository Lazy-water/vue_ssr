<template>
  <router-link to="/about">index</router-link>
</template>

<script lang="ts">
export default{
  setup() {

  },
  head() {
    return {
      title: 'index'
    }
  }
}
</script>


<style lang="scss" scoped>
.aaa{
  color: $base_color;
}
</style>