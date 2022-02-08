export default {
  state: {
    num: 1111,
    aaa: {}
  },
  mutations: {
    SET_AAA(state: any, aaa: any) {
      state.aaa = aaa
    }
  },
  actions: {
    setNum({ commit }: any, aaa: any) {
      commit('SET_AAA', aaa);
    }
  }
}