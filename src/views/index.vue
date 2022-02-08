<template>
  <router-link to="/about">{{num}}</router-link>
  <p class="bbb">{{aaa.company_name}}</p>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default{
  asyncData({ store }: any) {
    axios.get(
      'http://school.kouhigh.top/admin_company_category'
    ).then(({ data }) => {
      store.dispatch('setNum', data.data)
    })
    return {
      title: 'index'
    }
  },
  setup() {
    const store = useStore()

    let state = reactive({
      aaa: store.state.num.aaa
    })

    console.log(store.state.num.aaa)
    
    let num = ref(store.state.num.num)
    // let aaa = ref(store.state.num.aaa)

    return {
      num,
      ...toRefs(state)
    }
  }
}
</script>


<style lang="scss" scoped>
.aaa{
  color: $base_color;
}
</style>