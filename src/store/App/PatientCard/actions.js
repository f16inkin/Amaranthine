import axios from 'axios'
import {doRefresh} from "../../../services/RefreshTokens";

const apiUrl = 'http://192.168.0.6'

const prepareDataForUpdate = (state) => {
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
    return card
}

export const getCardAction = async({ commit }, id) => {
  try {
    let currentRefreshToken = localStorage.getItem('RefreshToken')
    let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
    let currentTime = Math.floor(Date.now() / 1000)
    let currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
      console.clear()
      console.log('Expires: '+accessTokenExpTime)
      console.log('Current: '+currentTime)
      console.log('Current minus 15s: '+currentTimePlus15)
      console.log('-----------------------')
      console.log('Waiting for tokens refresh')
      console.log('-----------------------')
      console.log('old Access Token ' + sessionStorage.getItem('JWT'))
      console.log('-----------------------')
      let currentAccessToken = await doRefresh(currentRefreshToken)
      let finishTime =  Math.floor(Date.now() / 1000)
      console.log('-----------------------')
      console.log('Tokens have refreshed')
      console.log('-----------------------')
      console.log('New Access Token ' + currentAccessToken)
      console.log('-----------------------')
      let card = await axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      let newCurrentTime =  Math.floor(Date.now() / 1000)
      console.log('-----------------------')
      console.log('Время запуска запроса: ' +currentTime)
      console.log('Время завершения запроса обновления токенов: ' +finishTime)
      console.log('Время завершения запроса общего: ' +newCurrentTime)
      console.log('Время завершения нового токена: ' +sessionStorage.getItem('JWTExpTime'))
      console.log('-----------------------')
      commit('GET_CARD', card.data)
    }else {
      let currentAccessToken = sessionStorage.getItem('JWT')
      console.clear()
      console.log('Expires: '+accessTokenExpTime)
      console.log('Current: '+currentTime)
      console.log('-----------------------')
      console.log('Current Access Token ' + currentAccessToken)
      let card =  await axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARD', card.data)
    }
  }catch (e) {
    console.log(e.response)
  }
}

export const getCardsAction = async({ commit }, payload) => {
  try {
    let currentRefreshToken = localStorage.getItem('RefreshToken')
    let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
    let currentTime = Math.floor(Date.now() / 1000)
    let currentTimePlus15 = currentTime + 15
    console.clear()
    console.log('Expires: '+accessTokenExpTime)
    console.log('Current: '+currentTime)
    console.log('Current minus 15s: '+currentTimePlus15)
    if (accessTokenExpTime <= currentTimePlus15){
      let currentAccessToken = await doRefresh(currentRefreshToken)
      let cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARDS', cards.data)
    }else{
      let currentAccessToken = sessionStorage.getItem('JWT')
      console.clear()
      console.log('Expires: '+accessTokenExpTime)
      console.log('Current: '+currentTime)
      console.log('Current minus 15s: '+currentTimePlus15)
      console.log('-----------------------')
      console.log('Current Access Token ' + currentAccessToken)
      let cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARDS', cards.data)
    }
  }catch (e) {
    /**
     * Вот здесь можно обрабатывать 400, 401 и тд коды
     * Например если клиент ловит 403 код (нет привелегий), то тут будет функция которая будет делать редирект на страницу
     * где об этом будет сказано, либо будет отрисовывать специальный компонент
     * Кароче тут будутвызваться еррор хендлеры в зависимости от кода и ниструкции к этому коду.
     * Например может придти 401 - токен не найден, а может придти 401 - токен сигнатура не верна(сейчас поменял на 400)
     */
    console.log(e.response)
  }

}

export const updateCardAction = async({ commit, state }, id) => {
    try{
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
        let currentTime = Math.floor(Date.now() / 1000)
        if (accessTokenExpTime <= currentTime){
            let currentAccessToken = await doRefresh(currentRefreshToken)
            let card = prepareDataForUpdate(state)
            let cardId = {'cardId' : card.CardId}
            await axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card), {headers: { Authorization: `Bearer ${currentAccessToken}` } })
            // Необходимо сделать разблокировку карты для других пользователей
            await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(cardId), {headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
            commit('UNBLOCK_CARD')

        }else{
            let card = prepareDataForUpdate(state)
            let cardId = {'cardId' : card.CardId}
            let currentAccessToken = sessionStorage.getItem('JWT')
            await axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card), {headers: { Authorization: `Bearer ${currentAccessToken}` } })
            // Необходимо сделать разблокировку карты для других пользователей
            await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(cardId), {headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
            commit('UNBLOCK_CARD')
        }
    }catch (e) {
        console.log(e)
    }
}

export const getDispositionsAction = async({ commit }, payload) => {
    try{
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
        let currentTime = Math.floor((Date.now() / 1000)+15)
        if (accessTokenExpTime <= currentTime){
            let currentAccessToken = await doRefresh(currentRefreshToken)
            let dispositions = await axios.get(`${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
            commit('GET_DISPOSITIONS', { dispositions: dispositions, disposition: payload.endpoint })
        }else {
            let currentAccessToken = sessionStorage.getItem('JWT')
            let dispositions = await axios.get(`${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
            commit('GET_DISPOSITIONS', { dispositions: dispositions.data, disposition: payload.endpoint })
        }
    }catch (e) {
        console.log(e.response)
    }
}

export const setDispositionAction = ({ commit }, payload) => {
  commit('SET_DISPOSITION', payload)
}

export const getInsuranceCompaniesAction = async({ commit }, payload) => {
    try{
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
        let currentTime = Math.floor((Date.now() / 1000)+15)
        if (accessTokenExpTime <= currentTime){
            let currentAccessToken = await doRefresh(currentRefreshToken)
            let companies = await axios.get(`${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
            commit('GET_INSURANCE_COMPANIES', { companies: companies.data })
        }else{
            let currentAccessToken = sessionStorage.getItem('JWT')
            let companies = await axios.get(`${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
            commit('GET_INSURANCE_COMPANIES', { companies: companies.data })
        }
    }catch (e) {
        console.log(e.response)
    }
}

export const setInsuranceCompanyAction = ({ commit }, payload) => {
  commit('SET_INSURANCE_COMPANY', payload)
}

export const getTalonAction = async ({ commit }, payload) => {
    try {
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
        let currentTime = Math.floor((Date.now() / 1000)+15)
        if (accessTokenExpTime <= currentTime) {
            let currentAccessToken = await doRefresh(currentRefreshToken)
            let response = await axios.get(`${apiUrl}/api/v1/talons/${payload.talon}/${payload.id}`, {responseType: 'blob', headers: { Authorization: `Bearer ${currentAccessToken}` }})
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report.pdf'
            window.open(link, '_blank')
        }else {
            let currentAccessToken = sessionStorage.getItem('JWT')
            let response = await axios.get(`${apiUrl}/api/v1/talons/${payload.talon}/${payload.id}`, {responseType: 'blob', headers: { Authorization: `Bearer ${currentAccessToken}` }})
            let blob = new Blob([response.data], { type: 'application/pdf' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'Report.pdf'
            window.open(link, '_blank')
        }
    }catch (e) {
        console.log(e.response)
    }
}

export const blockCardAction = async( {commit },cardId) => {
    try{
        let id = {'cardId': cardId}
        let currentRefreshToken = localStorage.getItem('RefreshToken')
        let accessTokenExpTime = sessionStorage.getItem('JWTExpTime');
        let accountId = sessionStorage.getItem('AccountId');
        let currentTime = Math.floor(Date.now() / 1000)
        if (accessTokenExpTime <= currentTime){
            let currentAccessToken = await doRefresh(currentRefreshToken)
            await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), {headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'on' } })
            commit('BLOCK_CARD', accountId)
        }else{
            let currentAccessToken = sessionStorage.getItem('JWT')
            await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), {headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'on'  } })
            commit('BLOCK_CARD', accountId)
        }
    }catch (e) {
        console.log(e.response)
    }
}
