import { login } from '@/api/login'
import { getInfo, getUserDetilById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    user_info: {},
    Timestamp: 0
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
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_TIMESTAMP(state, Timestamp) {
      state.Timestamp = Timestamp
    }
  },
  actions: {
    async asyncLogin({ commit }, loginData) {
      const data = await login(loginData)
      commit('setToken', data)
      commit('SET_TIMESTAMP', +new Date())
    },
    async getUserInfo({ commit }) {
      const res = await getInfo()
      const res1 = await getUserDetilById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
