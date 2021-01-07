export const increment = state => {
  state.count++
  state.history.push('increment')
}

export const changeView = state => {
  state.currentView = 'Cards'
}

export const GET_CARD = (state, card) => {
  Object.keys(card).forEach(function (k) {
    card[k] = card[k] ? card[k] : ''
    // console.log(k + ' - ' + card[k])
  })
  state.patientCard = card
}

export const GET_CARDS = (state, cards) => {
  state.patientCards = cards;
  state.currentView = 'Cards';
  console.log(cards)
}

export const GET_DISPOSITIONS = (state, payload) => {
  state.dispositions[payload.disposition] = payload.dispositions;
}

export const SET_DISPOSITION =  (state, payload) => {
  state.patientCard[Object.keys(payload)[0]] = payload.RegionId
  state.patientCard[Object.keys(payload)[1]] = payload.RegionName
  state.dispositions.regions = [];
  state.dispositions.districts = [];
  state.dispositions.localities = [];
  state.dispositions.streets = [];
  state.insuranceCompanies = [];
}

