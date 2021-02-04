import axios from 'axios'
import { doRefresh } from '../../../services/RefreshTokens'

const apiUrl = 'http://192.168.0.6'

const prepareCardCreateDTO = (DTO) => {
  DTO.CardNumber = parseInt(DTO.CardNumber)
  DTO.PolicyNumber = DTO.PolicyNumber.replace(/[^0-9]/gim, '')
  DTO.InsuranceCertificate = DTO.InsuranceCertificate.replace(/[^0-9]/gim, '')
  return DTO
}

const prepareFluorographyCreateDTO = (DTO) => {
    DTO.Type = parseInt(DTO.Type.typeId)
    DTO.Result = parseInt(DTO.Result.resultId)
    DTO.Dose = parseInt(DTO.Dose) ? parseInt(DTO.Dose.doseId) : null
    DTO.Sender = parseInt(DTO.Sender) ? parseInt(DTO.Sender.senderId) : null
    DTO.Snapshot = parseInt(DTO.Snapshot) || 1
    return DTO
}

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

export const getCardAction = async ({ commit }, id) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
      console.clear()
      console.log('Expires: ' + accessTokenExpTime)
      console.log('Current: ' + currentTime)
      console.log('Current minus 15s: ' + currentTimePlus15)
      console.log('-----------------------')
      console.log('Waiting for tokens refresh')
      console.log('-----------------------')
      console.log('old Access Token ' + sessionStorage.getItem('JWT'))
      console.log('-----------------------')
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const finishTime = Math.floor(Date.now() / 1000)
      console.log('-----------------------')
      console.log('Tokens have refreshed')
      console.log('-----------------------')
      console.log('New Access Token ' + currentAccessToken)
      console.log('-----------------------')
      const card = await axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      const newCurrentTime = Math.floor(Date.now() / 1000)
      console.log('-----------------------')
      console.log('Время запуска запроса: ' + currentTime)
      console.log('Время завершения запроса обновления токенов: ' + finishTime)
      console.log('Время завершения запроса общего: ' + newCurrentTime)
      console.log('Время завершения нового токена: ' + sessionStorage.getItem('JWTExpTime'))
      console.log('-----------------------')
      commit('GET_CARD', card.data)
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      console.clear()
      console.log('Expires: ' + accessTokenExpTime)
      console.log('Current: ' + currentTime)
      console.log('-----------------------')
      console.log('Current Access Token ' + currentAccessToken)
      const card = await axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARD', card.data)
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const getCardsAction = async ({ commit }, payload) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    console.clear()
    console.log('Expires: ' + accessTokenExpTime)
    console.log('Current: ' + currentTime)
    console.log('Current minus 15s: ' + currentTimePlus15)
    if (accessTokenExpTime <= currentTimePlus15) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARDS', cards.data)
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      console.clear()
      console.log('Expires: ' + accessTokenExpTime)
      console.log('Current: ' + currentTime)
      console.log('Current minus 15s: ' + currentTimePlus15)
      console.log('-----------------------')
      console.log('Current Access Token ' + currentAccessToken)
      const cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_CARDS', cards.data)
    }
  } catch (e) {
    /**
     * Вот здесь можно обрабатывать 400, 401 и тд коды
     * Например если клиент ловит 403 код (нет привелегий), то тут будет функция которая будет делать редирект на страницу
     * где об этом будет сказано, либо будет отрисовывать специальный компонент
     * Кароче тут будутвызваться еррор хендлеры в зависимости от кода и ниструкции к этому коду.
     * Например может придти 401 - токен не найден, а может придти 401 - токен сигнатура не верна(сейчас поменял на 400)
     */
    console.log(e)
  }
}

export const createCardAction = async ({ commit }, payload) => {
  try{
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    if (accessTokenExpTime <= currentTime) {
      const DTO = prepareCardCreateDTO(payload.cardCreateDTO)
      const currentAccessToken = await doRefresh(currentRefreshToken)
      return await axios.post(`${apiUrl}/api/v1/cards`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
    }else {
      const DTO = prepareCardCreateDTO(payload.cardCreateDTO)
      const currentAccessToken = sessionStorage.getItem('JWT')
      return await axios.post(`${apiUrl}/api/v1/cards`, JSON.stringify(payload.cardCreateDTO), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
    }
  }catch (e) {
    console.log(e)
  }
}

export const updateCardAction = async ({ commit, state }, id) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const card = prepareDataForUpdate(state)
      const cardId = { cardId: id }
      await axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      // Необходимо сделать разблокировку карты для других пользователей
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(cardId), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
      commit('UNBLOCK_CARD')
    } else {
      const card = prepareDataForUpdate(state)
      const cardId = { cardId: id }
      const currentAccessToken = sessionStorage.getItem('JWT')
      await axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      // Необходимо сделать разблокировку карты для других пользователей
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(cardId), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
      commit('UNBLOCK_CARD')
    }
  } catch (e) {
    console.log(e)
  }
}

export const getDispositionsAction = async ({ commit }, payload) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor((Date.now() / 1000) + 15)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const dispositions = await axios.get(`${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_DISPOSITIONS', { dispositions: dispositions, disposition: payload.endpoint })
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      const dispositions = await axios.get(`${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_DISPOSITIONS', { dispositions: dispositions.data, disposition: payload.endpoint })
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const setDispositionAction = ({ commit }, payload) => {
  commit('SET_DISPOSITION', payload)
}

export const getInsuranceCompaniesAction = async ({ commit }, payload) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor((Date.now() / 1000) + 15)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const companies = await axios.get(`${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_INSURANCE_COMPANIES', { companies: companies.data })
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      const companies = await axios.get(`${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_INSURANCE_COMPANIES', { companies: companies.data })
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const setInsuranceCompanyAction = ({ commit }, payload) => {
  commit('SET_INSURANCE_COMPANY', payload)
}

export const getTalonAction = async ({ commit }, payload) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor((Date.now() / 1000) + 15)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const response = await axios.get(`${apiUrl}/api/v1/talons/${payload.talon}/${payload.id}`, { responseType: 'blob', headers: { Authorization: `Bearer ${currentAccessToken}` } })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Report.pdf'
      window.open(link, '_blank')
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      const response = await axios.get(`${apiUrl}/api/v1/talons/${payload.talon}/${payload.id}`, { responseType: 'blob', headers: { Authorization: `Bearer ${currentAccessToken}` } })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Report.pdf'
      window.open(link, '_blank')
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const blockCardAction = async ({ commit }, cardId) => {
  try {
    const id = { cardId: cardId }
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const accountId = sessionStorage.getItem('AccountId')
    const currentTime = Math.floor(Date.now() / 1000)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'on' } })
      commit('BLOCK_CARD', accountId)
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'on' } })
      commit('BLOCK_CARD', accountId)
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const unblockCardAction = async ({ commit }, cardId) => {
  try {
    const id = { cardId: cardId }
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const accountId = sessionStorage.getItem('AccountId')
    const currentTime = Math.floor(Date.now() / 1000)
    if (accessTokenExpTime <= currentTime) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
      commit('UNBLOCK_CARD', accountId)
    } else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${currentAccessToken}`, 'Switch-Card': 'off' } })
      commit('UNBLOCK_CARD', accountId)
    }
  } catch (e) {
    console.log(e.response)
  }
}

export const getFluorographiesAction = async ( {commit }, id) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const fluorographies = await axios.get(`${apiUrl}/api/v1/fluorographies/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_FLUOROGRAPHIES', fluorographies.data)
    }else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      const fluorographies = await axios.get(`${apiUrl}/api/v1/fluorographies/${id}`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_FLUOROGRAPHIES', fluorographies.data)
    }
  }catch (e) {
    console.log(e.response)
  }
}

export const getFluorographyOptionsAction = async ({commit }) => {
  try{
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
      const currentAccessToken = await doRefresh(currentRefreshToken)
      const options = await axios.get(`${apiUrl}/api/v1/fluorography/options`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_FLUOROGRAPHY_OPTIONS', options.data)
    }else {
      const currentAccessToken = sessionStorage.getItem('JWT')
      const options = await axios.get(`${apiUrl}/api/v1/fluorography/options`, { headers: { Authorization: `Bearer ${currentAccessToken}` } })
      commit('GET_FLUOROGRAPHY_OPTIONS', options.data)
    }
  }catch (e) {
    console.log(e.response)
  }
}

export const createFluorographyAction = async ({commit}, payload) => {
  try {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
      const DTO = prepareFluorographyCreateDTO(payload)
      const currentAccessToken = await doRefresh(currentRefreshToken)
      return await axios.post(`${apiUrl}/api/v1/fluorographies`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
    }else {
      const DTO = prepareFluorographyCreateDTO(payload)
      const currentAccessToken = sessionStorage.getItem('JWT')
      return await axios.post(`${apiUrl}/api/v1/fluorographies`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${currentAccessToken}` } })
    }
  }catch (e) {
    console.log(e)
  }
}

export const deleteFluorographyAction = async ({commit}, ids) => {
    try{
        const currentRefreshToken = localStorage.getItem('RefreshToken')
        const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
        const currentTime = Math.floor(Date.now() / 1000)
        const currentTimePlus15 = currentTime + 15
        if (accessTokenExpTime <= currentTimePlus15) {
            const currentAccessToken = await doRefresh(currentRefreshToken)
            return await axios.delete(`${apiUrl}/api/v1/fluorographies`, { headers: { Authorization: `Bearer ${currentAccessToken}` }, data: ids })
        }else {
            const currentAccessToken = sessionStorage.getItem('JWT')
            return await axios.delete(`${apiUrl}/api/v1/fluorographies`, { headers: { Authorization: `Bearer ${currentAccessToken}` }, data:  ids })
        }
    }catch (e) {
      console.log(e)
    }
}
