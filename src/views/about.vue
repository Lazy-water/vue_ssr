<template>
  <div class="aaa" @click="back">about</div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default{
  setup() {
    const router = useRouter()

    const back = () => {
      router.go(-1)
    }

    return {
      back
    }
  },
  head() {
    return {
      title: 'about'
    }
  }
}
</script>


<style lang="scss" scoped>
.aaa{
  color: $base_color;
}
</style>