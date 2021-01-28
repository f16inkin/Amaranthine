const formatInsuranceCertificate = (certificate) => {
  if (certificate !== null && certificate !== ''){
    const pattern = new RegExp('.{1,' + 3 + '}', 'g')
    const insuranceCertificate = certificate.match(pattern)
    return insuranceCertificate.splice(0, 3).join('-') + ' ' + insuranceCertificate
  }else {
    return 'Необходимо заполнить СНИЛС'
  }
}

const formatPolicyNumber = (policy) => {
  if (policy !== null && policy !== ''){
    const pattern = new RegExp('.{1,' + 4 + '}', 'g')
    const policyNumber = policy.match(pattern)
    return policyNumber.join('-')
  }else {
    return 'Необходимо заполнить ПОЛИС'
  }
}

export const GET_CARD = (state, card) => {
  Object.keys(card).forEach(function (k) {
    card[k] = card[k] ? card[k] : ''
    // console.log(k + ' - ' + card[k])
  })
  state.patientCard = card
}

export const GET_CARDS = (state, cards) => {
  state.patientCards = cards
  Object.keys(cards.Cards).forEach(function (k) {
    cards.Cards[k].insuranceCertificate = formatInsuranceCertificate(cards.Cards[k].insuranceCertificate)
    cards.Cards[k].policyNumber = formatPolicyNumber(cards.Cards[k].policyNumber)
    cards.Cards[k].fullName = cards.Cards[k].surname + ' ' + cards.Cards[k].firstName + ' ' + (cards.Cards[k].secondName || '')
  })
}

export const GET_DISPOSITIONS = (state, payload) => {
  state.dispositions[payload.disposition] = payload.dispositions
}

export const SET_DISPOSITION = (state, payload) => {
  state.patientCard[Object.keys(payload)[0]] = payload[Object.keys(payload)[0]]
  state.patientCard[Object.keys(payload)[1]] = payload[Object.keys(payload)[1]]
  state.dispositions.regions = []
  state.dispositions.districts = []
  state.dispositions.localities = []
  state.dispositions.streets = []
}

export const GET_INSURANCE_COMPANIES = (state, payload) => {
  state.insuranceCompanies = payload.companies
}

export const SET_INSURANCE_COMPANY = (state, payload) => {
  state.patientCard.InsuranceCompanyId = payload.InsuranceCompanyId
  state.patientCard.InsuranceCompanyName = payload.InsuranceCompanyName
  state.insuranceCompanies = []
}

export const BLOCK_CARD = (state, accountId) => {
  state.patientCard.Owner = accountId
}

export const UNBLOCK_CARD = (state) => {
  state.patientCard.Owner = ''
}
