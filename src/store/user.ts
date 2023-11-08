// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notlogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // todo 1改成从远程请求获取登录信息
      commit("updateUser", { userName: "Cool" });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
