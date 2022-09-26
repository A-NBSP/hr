import { login } from '@/api/login'
import { getInfo, getUserDetilById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    user_info: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, data) {
      state.user_info = data
    },
    REMOVE_USER_INFO(state) {
      state.user_info = {}
    }
  },
  actions: {
    async asyncLogin({ commit }, loginData) {
      const data = await login(loginData)
      commit('setToken', data)
    },
    async getUserInfo({ commit }) {
      const res = await getInfo()
      const res1 = await getUserDetilById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }
}
