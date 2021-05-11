import { createStore } from 'vuex'

export default createStore({
  state: {
    userInformation: {
      type: 'vistor',
      name: '',
      id: ''
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
