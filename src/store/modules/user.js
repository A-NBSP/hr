import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async asyncLogin({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('setToken', data)
    }
  }
}
