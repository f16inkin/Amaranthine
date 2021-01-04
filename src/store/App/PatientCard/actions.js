import axios from 'axios'

const apiUrl = 'http://192.168.0.6'

export const increment = ({ commit }) => {
  commit('increment')
}

export const changeView = ({ commit }) => {
  commit('changeView')
}

export const getCardAction = ({ commit }, id) => {
  return axios.get(`${apiUrl}/api/v1/cards/${id}`)
    .then(function (response) {
      return response.data
    }).then(data => {
      commit('GET_CARD', data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
