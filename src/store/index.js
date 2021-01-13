import { createStore } from 'vuex'

import card from './App/PatientCard/card'
import auth from './Core/Auth/auth'

export default createStore({
  modules: {
    card,
    auth
  }
})
