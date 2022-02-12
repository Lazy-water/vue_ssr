import { createStore, Store, ModuleTree } from 'vuex'

import num from './module/num'

export const store: Store<ModuleTree<unknown | undefined>> = createStore({
  modules: {
    num
  }
})