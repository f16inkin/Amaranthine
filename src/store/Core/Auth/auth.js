import * as actions from './actions'
import * as mutations from './mutations'

const state = {
    isAuth: false// Будут назодится все данные касаемые пользователя, его прав и его сессии
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
