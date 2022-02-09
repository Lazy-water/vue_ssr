<template>
  <router-link to="/about">{{num}}</router-link>
  <p class="bbb">{{aaa.company_name}}</p>
</template>

<script lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default{
  asyncData() {
    return {
      title: 'index'
    }
  },
  async setup() {
    const store = useStore()

    let state = reactive({
      aaa: null
    })

    const setA = async () => {
      await axios.get(
        'http://school.kouhigh.top/admin_company_category'
      ).then( async ({ data }) => {
        // store.dispatch('setNum', data.data)
        state.aaa = data.data
      })
    }
    
    
    let num = ref(store.state.num.num)
    // let aaa = ref(store.state.num.aaa)
    await setA()
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