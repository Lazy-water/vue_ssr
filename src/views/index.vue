<template>
  <router-link to="/about">{{num}}</router-link>
  <p>{{aaa}}</p>
  <div @click="setA">center</div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
export default{
  setup() {
    const store = useStore()

    let num = ref(store.state.num.num)
    let aaa = ref(111)
    const setA = () => {
      store.dispatch('setNum', 333)
      aaa.value = store.state.num.aaa
    }
    
    
    return {
      setA,
      num,
      aaa
    }
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