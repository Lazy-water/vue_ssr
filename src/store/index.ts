import { createStore } from 'vuex'

import num from './module/num'

export const store = createStore({
  modules: {
    num
  }
})