import axios from 'axios'

const apiUrl = 'http://192.168.0.6'

const setStorage = (payload, accessToken, refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      sessionStorage.setItem('JWT', accessToken)
      sessionStorage.setItem('JWTExpTime', payload.exp)
      sessionStorage.setItem('AccountId', payload.accountId)
      sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
      sessionStorage.setItem('Talons', payload.talons)
      localStorage.setItem('RefreshToken', refreshToken)
      resolve();
    }, 1000)
  })
  /*sessionStorage.setItem('JWT', accessToken)
  sessionStorage.setItem('JWTExpTime', payload.exp)
  sessionStorage.setItem('AccountId', payload.accountId)
  sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
  sessionStorage.setItem('Talons', payload.talons)
  localStorage.setItem('RefreshToken', refreshToken)*/
}

const refreshTokens = async(oldRefreshToken) => {
  console.log('Start requesting new pare of tokens')
  let result = await axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: {RefreshToken: oldRefreshToken}})
  console.log('Finish requesting new pare of tokens')
  let newAccessToken = result.data.AccessToken
  let newRefreshToken = result.data.RefreshToken
  let payload = await JSON.parse(atob(newAccessToken.split('.')[1]))
  console.log('Start setting storage')
  await setStorage(payload, newAccessToken, newRefreshToken)
  console.log('Finish setting storage')

}


export const getCardAction = ({ commit }, id) => {
  let AuthorizationHeader = sessionStorage.getItem('JWT')
  return axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${AuthorizationHeader}` } })
    .then(function (response) {
      return response.data
    }).then(data => {
      commit('GET_CARD', data)
    })
    .catch(function (error) {
      console.log(error.response)
    })
}

export const getCardsAction = async({ commit }, payload) => {
  let currentRefreshToken = localStorage.getItem('RefreshToken')
  let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
  let currentTime = Math.floor(Date.now() / 1000)
  if (accessTokenExpTime <= currentTime){
    await refreshTokens(currentRefreshToken)
    let cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset } })
    commit('GET_CARDS', cards.data)
  }else{
      let cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset } })
      commit('GET_CARDS', cards.data)
  }
}

/*export const getCardsAction = ({ commit }, payload) => {
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
}*/

export const updateCardAction = ({ commit, state }, id) => {
  // Переопределение типов, для нормального захода их на сервер
  const card = state.patientCard
  card.CardNumber = parseInt(card.CardNumber)
  card.InsuranceCompanyId = parseInt(card.InsuranceCompanyId) || null
  card.RegionId = parseInt(card.RegionId) || null
  card.DistrictId = parseInt(card.DistrictId) || null
  card.LocalityId = parseInt(card.LocalityId) || null
  card.StreetId = parseInt(card.StreetId) || null
  // Либо дата есть, либо она отсутсвует. Форматирование для коректной отправки на сервер
  card.PassportDateOfIssue = card.PassportDateOfIssue || null
  card.BirthCertificateDateOfIssue = card.BirthCertificateDateOfIssue || null
  // Подготовка номера полиса, СНИЛС к отправке в БД
  card.PolicyNumber = card.PolicyNumber.replace(/[^0-9]/gim, '')
  card.InsuranceCertificate = card.InsuranceCertificate.replace(/[^0-9]/gim, '')
  // AJAX in action
  return axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card))
    .then(function (response) {
      return response.data.card_data
    })// .then(data => {
  // commit('GET_CARD', data)
  // })
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
  commit('SET_DISPOSITION', payload)
}

export const getInsuranceCompaniesAction = ({ commit }, payload) => {
  return axios.get(
        `${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit } })
    .then(function (response) {
      return response.data
    }).then(companies => {
      commit('GET_INSURANCE_COMPANIES', { companies: companies })
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const setInsuranceCompanyAction = ({ commit }, payload) => {
  commit('SET_INSURANCE_COMPANY', payload)
}
