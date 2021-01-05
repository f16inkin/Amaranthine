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
  state.patientCard.Gender = card.Gender.toString()
}
