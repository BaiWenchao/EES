import { createStore } from 'vuex'

export default createStore({
  state: {
    userInformation: {
      type: 'visitor'
    }
  },
  mutations: {
    login (state, userInformation) {
      state.userInformation = userInformation
    },
    exit (state) {
      state.userInformation = { type: 'visitor' }
    }
  },
  actions: {
  }
})
