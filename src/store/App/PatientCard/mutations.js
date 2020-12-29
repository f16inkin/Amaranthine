export const increment = state => {
  state.count++
  state.history.push('increment')
}

export const GET_CARD = (state, card) => {
  state.card = card
  state.card.passport = card.passportSerial + ' ' + card.passportNumber
  state.card.birthCertificate = card.birthCertificateSerial + ' ' + card.birthCertificateNumber
  state.currentView = 'Card'
  state.cards = []
  state.isAllowButtons = true
}
