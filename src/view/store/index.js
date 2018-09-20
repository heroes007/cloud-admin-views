import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state:{
    userinfo:{
      nickname:"",
      avatar:"",
      desc:"",
      email:"",
    },
  },
  mutations:{
    CHANGE_USERINFO(state,userinfo){
      state.userinfo = userinfo
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) =>
          sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key),
      },
    }),
  ],
})

export default store
