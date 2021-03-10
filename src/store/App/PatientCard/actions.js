import axios from 'axios'
import { getAccessToken } from '@/services/AccessToken'
import { apiUrl } from '@/configs/configs'

const prepareCardCreateDTO = (DTO) => {
  DTO.CardNumber = parseInt(DTO.CardNumber)
  DTO.PolicyNumber = DTO.PolicyNumber ? DTO.PolicyNumber.replace(/[^0-9]/gim, '') : null
  DTO.InsuranceCertificate = DTO.InsuranceCertificate.replace(/[^0-9]/gim, '')
  return DTO
}

const prepareFluorographyDTO = (payload) => {
    const DTO = {}
    DTO.PatientCardId = payload.PatientCardId
    DTO.FluorographyId = payload.FluorographyId
    DTO.FluorographyDate = payload.FluorographyDate
    DTO.FluorographyTypeId = parseInt(payload.FluorographyType.typeId)
    DTO.FluorographyTypeName = payload.FluorographyType.typeName
    DTO.FluorographyResultId = parseInt(payload.FluorographyResult.resultId)
    DTO.FluorographyResultName = payload.FluorographyResult.resultName
    DTO.FluorographyDoseId = payload.FluorographyDose ? parseInt(payload.FluorographyDose.doseId) : null
    DTO.FluorographyDoseName = payload.FluorographyDose ? payload.FluorographyDose.doseName : null
    DTO.FluorographySenderId = payload.FluorographySender ? parseInt(payload.FluorographySender.senderId) : null
    DTO.FluorographySenderName = payload.FluorographySender ? payload.FluorographySender.senderName : null
    DTO.FluorographySnapshot = parseInt(payload.FluorographySnapshot) || 1
    DTO.FluorographyNumber = payload.FluorographyNumber || '0'
    DTO.FluorographyNotation = payload.FluorographyNotation || null
    return DTO
}

const prepareVaccinationDTO = (payload) => {
  const DTO = {}
  DTO.PatientCardId = payload.PatientCardId
  DTO.VaccinationId = payload.VaccinationId
  DTO.VaccinationDate = payload.VaccinationDate
  DTO.VaccinationTypeId = parseInt(payload.VaccinationType.typeId)
  DTO.VaccinationTypeName = payload.VaccinationType.typeName
  DTO.VaccinationDivertId = payload.VaccinationDivert ? parseInt(payload.VaccinationDivert.divertId) : null
  DTO.VaccinationDivertName = payload.VaccinationDivert ? payload.VaccinationDivert.divertName : null
  DTO.VaccinationDoseId = payload.VaccinationDose ? parseInt(payload.VaccinationDose.doseId) : null
  DTO.VaccinationDoseName = payload.VaccinationDose ? payload.VaccinationDose.doseName : null
  DTO.VaccinationInjectionId = payload.VaccinationInjection ? parseInt(payload.VaccinationInjection.injectionId) : null
  DTO.VaccinationInjectionName = payload.VaccinationInjection ? payload.VaccinationInjection.injectionName : null
  DTO.VaccinationSerial = payload.VaccinationSerial || null
  DTO.VaccinationNotation = payload.VaccinationNotation || null
  return DTO
}

const prepareDataForUpdate = (state) => {
  const card = state.patientCard
  card.CardNumber = parseInt(card.CardNumber)
  card.InsuranceCompanyId = parseInt(card.InsuranceCompanyId) || null
  // Либо дата есть, либо она отсутсвует. Форматирование для коректной отправки на сервер
  card.PassportDateOfIssue = card.PassportDateOfIssue || null
  card.BirthCertificateDateOfIssue = card.BirthCertificateDateOfIssue || null
  // Подготовка номера полиса, СНИЛС к отправке в БД
  card.PolicyNumber = card.PolicyNumber.replace(/[^0-9]/gim, '')
  card.TemporaryPolicyNumber = card.TemporaryPolicyNumber.replace(/[^0-9]/gim, '')
  card.InsuranceCertificate = card.InsuranceCertificate.replace(/[^0-9]/gim, '')
  return card
}

export const getCardAction1 = async ({ commit }, id) => {
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

export const getCardAction = async ({ commit }, id) => {
    try {
        const accessToken = await getAccessToken();
        const card = await axios.get(`${apiUrl}/api/v1/cards/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        commit('GET_CARD', card.data)
    } catch (e) {
        console.log(e.response)
    }
}

export const getCardsAction = async ({ commit }, payload) => {
  try {
      const accessToken = await getAccessToken()
      const cards = await axios.get(`${apiUrl}/api/v1/search/cards`, { params: { searchString: payload.searchString, page: payload.page, offset: payload.offset }, headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_CARDS', cards.data)
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
      const DTO = prepareCardCreateDTO(payload.cardCreateDTO)
      const accessToken = await getAccessToken()
      return await axios.post(`${apiUrl}/api/v1/cards`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${accessToken}` } })
  }catch (e) {
    console.log(e)
  }
}

export const updateCardAction = async ({ commit, state }, id) => {
  try {
      const accessToken = await getAccessToken()
      const card = prepareDataForUpdate(state)
      const cardId = { cardId: id }
      const result = await axios.put(`${apiUrl}/api/v1/cards`, JSON.stringify(card), { headers: { Authorization: `Bearer ${accessToken}` } })
      // Необходимо сделать разблокировку карты для других пользователей
      await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(cardId), { headers: { Authorization: `Bearer ${accessToken}`, 'Switch-Card': 'off' } })
      commit('UNBLOCK_CARD')
      // Вполне можно вернуть ответ клиенту
      return result
  } catch (e) {
    console.log(e)
  }
}

export const getDispositionsAction = async ({ commit }, payload) => {
  try {
      const accessToken = await getAccessToken()
      const dispositions = await axios.get(`${apiUrl}/api/v1/search/${payload.endpoint}`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_DISPOSITIONS', { dispositions: dispositions, disposition: payload.endpoint })
  } catch (e) {
    console.log(e.response)
  }
}

export const setDispositionAction = ({ commit }, payload) => {
  commit('SET_DISPOSITION', payload)
}

export const clearDispositionsAction = ({ commit }) => {
    commit('CLEAR_DISPOSITIONS')
}

export const getInsuranceCompaniesAction = async ({ commit }, payload) => {
  try {
      const accessToken = await getAccessToken()
      const companies = await axios.get(`${apiUrl}/api/v1/search/insurance-companies`, { params: { searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_INSURANCE_COMPANIES', { companies: companies.data })
  } catch (e) {
    console.log(e.response)
  }
}

export const setInsuranceCompanyAction = ({ commit }, payload) => {
  commit('SET_INSURANCE_COMPANY', payload)
}

export const getTalonAction = async ({ commit }, payload) => {
  try {
      const accessToken = await getAccessToken()
      const response = await axios.get(`${apiUrl}/api/v1/documents/forms/${payload.id}`, { params: JSON.stringify(payload.formName), responseType: 'blob', headers: { Authorization: `Bearer ${accessToken}` } })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Report.pdf'
      window.open(link, '_blank')
  } catch (e) {
    console.log(e.response)
  }
}

export const blockCardAction = async ({ commit }, cardId) => {
  try {
    const id = { cardId: cardId }
    const accessToken = await getAccessToken()
    const result = await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${accessToken}`, 'Switch-Card': 'on' } })
    commit('BLOCK_CARD', sessionStorage.getItem('AccountId'))
    return result
  }catch (e) {
    console.log(e)
  }
}

export const unblockCardAction = async ({ commit }, cardId) => {
  try {
    const id = { cardId: cardId }
    const accessToken = await getAccessToken()
    await axios.patch(`${apiUrl}/api/v1/cards`, JSON.stringify(id), { headers: { Authorization: `Bearer ${accessToken}`, 'Switch-Card': 'off' } })
    commit('UNBLOCK_CARD')
  } catch (e) {
    console.log(e)
  }
}

/**
 * Флюорография
 */

export const getFluorographiesAction = async ( {commit }, id) => {
  try {
      const accessToken = await getAccessToken()
      const fluorographies = await axios.get(`${apiUrl}/api/v1/fluorographies/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_FLUOROGRAPHIES', fluorographies.data)
  }catch (e) {
    console.log(e.response)
  }
}

export const getFluorographyOptionsAction = async ({commit }) => {
  try{
      const accessToken = await getAccessToken()
      const options = await axios.get(`${apiUrl}/api/v1/fluorography/options`, { headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_FLUOROGRAPHY_OPTIONS', options.data)
  }catch (e) {
    console.log(e.response)
  }
}

export const createFluorographyAction = async ({commit}, payload) => {
  try {
      const DTO = prepareFluorographyDTO(payload)
      const accessToken = await getAccessToken()
      return await axios.post(`${apiUrl}/api/v1/fluorographies`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${accessToken}` } })
  }catch (e) {
    console.log(e)
  }
}

export const updateFluorographyAction = async ({commit}, payload) => {
  try {
      const DTO = prepareFluorographyDTO(payload)
      const accessToken = await getAccessToken()
      return await axios.put(`${apiUrl}/api/v1/fluorographies`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${accessToken}` } })
  }catch (e) {
    console.log(e)
  }
}

export const deleteFluorographyAction = async ({commit}, ids) => {
    try{
        const accessToken = await getAccessToken()
        return await axios.delete(`${apiUrl}/api/v1/fluorographies`, { headers: { Authorization: `Bearer ${accessToken}` }, data: ids })
    }catch (e) {
      console.log(e)
    }
}

/**
 * Прививки
 */

export const getVaccinationsAction = async ( {commit }, id) => {
  try {
      const accessToken = await getAccessToken()
      const vaccinations = await axios.get(`${apiUrl}/api/v1/vaccinations/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_VACCINATIONS', vaccinations.data)
  }catch (e) {
    console.log(e.response)
  }
}

export const getVaccinationOptionsAction = async ({commit }) => {
  try{
      const accessToken = await getAccessToken()
      const options = await axios.get(`${apiUrl}/api/v1/vaccination/options`, { headers: { Authorization: `Bearer ${accessToken}` } })
      commit('GET_VACCINATION_OPTIONS', options.data)
  }catch (e) {
    console.log(e.response)
  }
}

export const createVaccinationAction = async ({commit}, payload) => {
  try {
      const DTO = prepareVaccinationDTO(payload)
      const accessToken = await getAccessToken()
      return await axios.post(`${apiUrl}/api/v1/vaccinations`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${accessToken}` } })
  }catch (e) {
    console.log(e)
  }
}

export const updateVaccinationAction = async ({commit}, payload) => {
  try {
      const DTO = prepareVaccinationDTO(payload)
      const accessToken = await getAccessToken()
      return await axios.put(`${apiUrl}/api/v1/vaccinations`, JSON.stringify(DTO), { headers: { Authorization: `Bearer ${accessToken}` } })
  }catch (e) {
    console.log(e)
  }
}

export const deleteVaccinationAction = async ({commit}, ids) => {
  try{
      const accessToken = await getAccessToken()
      return await axios.delete(`${apiUrl}/api/v1/vaccinations`, { headers: { Authorization: `Bearer ${accessToken}` }, data: ids })
  }catch (e) {
    console.log(e)
  }
}

/**
 * Адреса
 */

export const getAddressesAction = async ({ commit }, id) => {
    try {
        const accessToken = await getAccessToken();
        const result = await axios.get(`${apiUrl}/api/v1/addresses/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } })
        if (result.status === 200){
            console.log(result.data)
            commit('GET_ADDRESSES', result.data)
        }else if (result.status === 204){
            //Такой способ ну прям временная заглушка
            const address = {
                ResidenceAddress : {
                    PatientCardId: null,
                    AddressId: null,
                    AddressTypeId: null,
                    RegionId: null,
                    RegionName: null,
                    DistrictId: null,
                    DistrictName: null,
                    LocalityId: null,
                    LocalityName: null,
                    StreetId: null,
                    StreetName: null,
                    HouseNumber: null,
                    Apartment: null
                }
            }
            console.log(address)
            commit('GET_ADDRESSES', address)
        }
    } catch (e) {
        console.log(e)
    }
}

export const createAddressesAction = async ({ commit }, payload) => {
    try {
        const accessToken = await getAccessToken()
        const result =  await axios.post(`${apiUrl}/api/v1/addresses`, JSON.stringify(payload), { headers: { Authorization: `Bearer ${accessToken}` } })
        if (result.status === 201){
            payload.AddressId = result.data
            commit('UPDATE_ADDRESSES', payload)
        }
    } catch (e) {
        console.log(e)
    }
}

export const updateAddressesAction = async ({ commit }, payload) => {
    try {
        const accessToken = await getAccessToken()
        const result = await axios.put(`${apiUrl}/api/v1/addresses`, JSON.stringify(payload), { headers: { Authorization: `Bearer ${accessToken}` } })
        commit('UPDATE_ADDRESSES', payload)
    } catch (e) {
        console.log(e)
    }
}

export const searchAddressAction = async ({ commit }, payload) => {
    try {
        const accessToken = await getAccessToken();
        const addresses = await axios.get(`${apiUrl}/api/v1/addresses/search`, { params: {target: payload.target, searchString: payload.searchString, limit: payload.limit }, headers: { Authorization: `Bearer ${accessToken}` } })
        return addresses.data
    } catch (e) {
        console.log(e.response)
    }
}

/**
 * Отчеты
 */

export const getPastPatientsAction = async ({ commit }, payload) => {
    const accessToken = await getAccessToken();
    return await axios.get(`${apiUrl}/api/v1/report/fluorography/past-patients`, { params: JSON.stringify(payload), headers: { Authorization: `Bearer ${accessToken}` }})
}
