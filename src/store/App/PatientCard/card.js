import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  count: 0,
  currentView: 'Card'
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
