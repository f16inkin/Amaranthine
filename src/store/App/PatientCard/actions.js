import axios from 'axios'

const apiUrl = 'http://192.168.0.6'

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

export const getCardsAction = ({ commit }, payload) => {
    return axios.get(
        `${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset } })
        .then(function (response) {
            return response.data
        }).then(cards => {
            commit('GET_CARDS', cards)
        })
        .catch(function (error) {
            console.log(error)
        })
}

export const updateCardAction = ( { commit, state}, id) => {
  // Переопределение типов.
  let card = state.patientCard
  card.CardNumber = parseInt(card.CardNumber)
  return axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card))
      .then(function (response) {
        return response.data.card_data
      })//.then(data => {
      //commit('GET_CARD', data)
      //})
      .catch(function (error) {
        console.log(error)
      })
}

export const getDispositionsAction = ({ commit }, payload) => {
  return axios.get(
      `${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit } })
    .then(function (response) {
      return response.data
    }).then(dispositions => {
      commit('GET_DISPOSITIONS', { dispositions: dispositions, disposition: payload.endpoint })
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const setDispositionAction = ({ commit }, payload) => {
  commit('SET_DISPOSITION', payload);
}


