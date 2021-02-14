import axios from 'axios'
import { apiUrl } from '../configs/configs'

const fillStorage = (payload, accessToken, refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      sessionStorage.setItem('JWT', accessToken)
      sessionStorage.setItem('JWTExpTime', payload.exp)
      sessionStorage.setItem('AccountId', payload.accountId)
      sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
      sessionStorage.setItem('Talons', payload.talons)
      localStorage.setItem('RefreshToken', refreshToken)
      resolve()
    }, 1000)
  })
  /* sessionStorage.setItem('JWT', accessToken)
    sessionStorage.setItem('JWTExpTime', payload.exp)
    sessionStorage.setItem('AccountId', payload.accountId)
    sessionStorage.setItem('AccountPermissions', payload.accountPermissions)
    sessionStorage.setItem('Talons', payload.talons)
    localStorage.setItem('RefreshToken', refreshToken) */
}

export const doRefresh = async (oldRefreshToken) => {
  console.log('Start requesting new pare of tokens')
  const result = await axios.get(`${apiUrl}/api/v1/auth/doRefresh`, { params: { RefreshToken: oldRefreshToken } })
  console.log('Finish requesting new pare of tokens')
  const newAccessToken = result.data.AccessToken
  const newRefreshToken = result.data.RefreshToken
  const payload = await JSON.parse(atob(newAccessToken.split('.')[1]))
  console.log('Start setting storage')
  await fillStorage(payload, newAccessToken, newRefreshToken)
  console.log('Finish setting storage!')
  return newAccessToken
}
