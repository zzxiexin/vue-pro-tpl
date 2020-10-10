export default {
  namespaced: true,
  state: {
    count: 0
  },
  getters: {
    getCount(state) {
      return state.count;
    }
  },
  mutations: {
    setCount(state, val) {
      state.count += val;
    },
    decreaseCount(state, val) {
      state.count -= val;
    }
  },
  actions: {
    asyncSetCount({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("setCount", 1);
        }, 1000);
        resolve("action success");
      });
    }
  }
};
