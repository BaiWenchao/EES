import { createStore } from 'vuex'

export default createStore({
  state: {
    userInformation: {
      type: 'admin'
    }
  },
  mutations: {
    login (state, userInformation) {
      state.userInformation = userInformation
    }
  },
  actions: {
  }
})
