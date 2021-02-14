import { doRefresh } from "./RefreshTokens";

export const getAccessToken  = async() => {
    const currentRefreshToken = localStorage.getItem('RefreshToken')
    const accessTokenExpTime = sessionStorage.getItem('JWTExpTime')
    const currentTime = Math.floor(Date.now() / 1000)
    const currentTimePlus15 = currentTime + 15
    if (accessTokenExpTime <= currentTimePlus15) {
        return await doRefresh(currentRefreshToken)
    }else {
        return sessionStorage.getItem('JWT')
    }
}
